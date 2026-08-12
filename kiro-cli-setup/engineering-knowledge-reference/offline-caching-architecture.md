# Offline-First Caching Architecture

**Stack:** FastAPI (Python) · PostgreSQL · Redis · React (Vite) · SQLite WASM + OPFS

## Overview

This architecture layers caching across three tiers so the app stays fast online and fully usable offline:

1. **PostgreSQL** — source of truth
2. **Redis** — server-side cache, avoids hitting Postgres on every request
3. **SQLite (WASM + OPFS) in the browser** — client-side cache, keeps the PWA usable with no network connection

Two data types drive the client-side layer:
- **Forecast data** (weather/price, 7–30 day windows) — structured, read-heavy, benefits from real SQL queries
- **Session/auth state** — needs to survive offline, but is a security concern, not just a caching concern

---

## Backend: FastAPI + Redis + PostgreSQL

### Tools

| Concern | Tool | Why |
|---|---|---|
| Redis client | `redis-py` (`redis.asyncio`) | Async-native, works cleanly with FastAPI's async endpoints. `aioredis` is deprecated/merged into this. |
| Postgres driver | `asyncpg` | Fast async driver; pair with SQLAlchemy 2.0 async engine if you want an ORM, or use raw SQL for simpler read-heavy paths |
| JWT signing | `python-jose` | Issue/verify access + refresh tokens |
| Password hashing | `passlib[bcrypt]` | Standard, well-audited |

### Cache-aside pattern (Redis ↔ Postgres)

1. Request comes in for forecast data.
2. Check Redis first.
3. **Hit:** return immediately.
4. **Miss:** query Postgres, write result to Redis with a TTL, return it.
5. On writes/updates to the underlying data, invalidate (or update) the relevant Redis key.

A TTL of a few hours is reasonable for forecast data, since the underlying values only refresh periodically anyway.

### JWT strategy

Issue **two tokens**:
- **Access token** — short-lived (~15 min), used for normal authenticated requests
- **Refresh token** — long-lived (~7–30 days), matched to your desired "offline grace period"

The refresh token is what lets a user stay logged into the PWA for days without any network contact.

### HTTP caching on forecast endpoints

Add `ETag` or `Last-Modified` headers to forecast responses. This lets the frontend send conditional requests (`If-None-Match`) and skip re-downloading unchanged data even while online — a cheap bandwidth win layered on top of the Redis cache.

---

## Frontend: React + Vite + SQLite WASM/OPFS

### Tools

| Concern | Tool | Why |
|---|---|---|
| Build tool | **Vite** | First-class PWA tooling; CRA is effectively unmaintained |
| App shell offline caching | **`vite-plugin-pwa`** (Workbox under the hood) | Precaches JS/CSS/HTML so the app *loads* with zero network — separate from the data layer |
| In-browser SQL database | **`@sqlite.org/sqlite-wasm`** (official build) | Simplest to set up, best documentation. Requires COOP/COEP headers (see below) |
| Alternative if Safari issues appear | **`wa-sqlite`** with `OPFSCoopSyncVFS` | Better cross-browser reliability (especially Safari), no COOP/COEP requirement, some Chrome-side perf tradeoff |
| Worker communication | **`comlink`** | SQLite/OPFS must run in a dedicated Web Worker, not the main thread; Comlink removes manual `postMessage` boilerplate |
| Session token storage | **`idb-keyval`** | Tiny IndexedDB wrapper for a single small value (JWT pair) — keep this separate from the SQLite forecast tables |

### Why SQLite (not just IndexedDB) for forecast data

Forecast data is structured and benefits from real range queries (e.g. "prices for days 12–18", "average temp this week"). IndexedDB is a key-value store and gets awkward for that. SQLite via WASM/OPFS gives you actual SQL, persisted to disk, queryable offline.

### Suggested schema shape

- `forecasts(entity_id, date, value, fetched_at, expires_at)` — upsert per day rather than duplicating rows
- `pending_writes(...)` — an "outbox" table, only needed if users can perform offline actions that must sync back later

### Data flow pattern (stale-while-revalidate)

1. On load, read from local SQLite immediately — instant render, works offline.
2. If online, kick off a background fetch from the FastAPI backend.
3. Upsert fresh rows into SQLite, update the UI, clear any "stale" indicator.
4. Periodically prune rows past their relevant date window.

### Headers requirement (official SQLite WASM build only)

The official build depends on `SharedArrayBuffer`, which requires these response headers from your dev server and production reverse proxy (nginx/Caddy/CDN):

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

If this is a hassle to propagate through your infrastructure, `wa-sqlite` + `OPFSCoopSyncVFS` avoids the requirement entirely.

---

## Offline Session / Auth

This is an **offline authentication problem**, not just a caching problem — treat it with more care than the forecast cache.

- Never store raw passwords or sensitive data client-side beyond the token itself.
- Store the JWT pair in `idb-keyval`, not mixed into the SQLite forecast tables.
- On app boot: read the token, check expiry client-side, treat "unexpired access token present" as logged-in — **regardless of network state**.
- When back online, silently call the refresh endpoint to extend the session.
- Decide what "offline logged in" is allowed to do. Typically: read-only / limited-trust mode. Anything that mutates server state should queue (see outbox pattern) and be re-validated once connectivity returns.
- Set a sane offline grace period (refresh token expiry) so a lost/stolen device isn't indefinitely authenticated.

---

## Full Request Flow

1. User opens the PWA → service worker serves the app shell instantly, even with no network.
2. Auth check → local token read from IndexedDB, expiry checked client-side, no network needed.
3. Forecast hook checks local SQLite first → renders immediately with a "last updated" indicator if data is stale.
4. If online: fetch from FastAPI `/forecasts` → Redis cache-aside → Postgres fallback on miss → response upserted into local SQLite.
5. If offline: user sees last-cached forecast + logged-in state, no errors, no blocked UI.
6. On reconnect: any queued offline writes flush from the outbox table; refresh token silently renews.

---

## Known Browser Gotchas

- **Safari**: `FileSystemFileHandle.createWritable` isn't supported — writes must go through `createSyncAccessHandle()` in a worker. Some VFS implementations show `RangeError` on large queries; `OPFSCoopSyncVFS` avoids this.
- **iOS (all browsers)**: Chrome/Firefox on iOS are Safari under the hood (Apple's WebKit requirement), so Safari's limitations apply app-wide on iOS regardless of which browser the user opens.
- **Private/incognito browsing**: Chrome caps OPFS around ~100MB in incognito; Firefox and Safari disable OPFS entirely in private mode. Build a graceful fallback (e.g., in-memory only) for this case.
