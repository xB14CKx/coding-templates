# Profile — Python service

**Detect:** `pyproject.toml` with a web framework dependency, `requirements.txt`
plus a `Dockerfile`, or an `alembic.ini` / `manage.py`.

## Where things live

Look for the real layout before assuming — these vary a lot:

| Convention | Signal |
|---|---|
| src layout | `src/<pkg>/` with the package inside |
| flat layout | `<pkg>/` at the root |
| Django | `manage.py`, `settings.py`, `urls.py`, `apps/` |
| FastAPI | `APIRouter`, `Depends`, `app.include_router` |
| Flask | `create_app`, blueprints |

Common structure inside the package: routers → services → repositories →
models. Confirm by reading one complete request end to end rather than trusting
the tree shape.

## Check before writing

- **The installed version of everything.** `pyproject.toml` pins ranges; the
  lockfile pins reality. A FastAPI 0.9 codebase is not a FastAPI codebase today.
- **Async or sync.** Do not mix. An `async def` calling blocking I/O stalls the
  event loop, and it is the most common performance bug in these services.
- **Pydantic v1 or v2.** They have incompatible APIs. `.model_dump()` vs
  `.dict()` is the tell.
- **SQLAlchemy 1.x or 2.x.** The session and query APIs differ substantially.
- **The migration tool** — Alembic, or Django's built-in. Migrations are the
  schema of record; there is usually no checked-in schema dump.
- **Where the settings come from** — env vars, a config module, a secrets
  manager. Never hard-code a value that differs per environment.

## Conventions worth recording

- How routes stay thin (where business logic lives).
- The session lifecycle: request-scoped, dependency-injected, or manual.
- The error contract: one exception hierarchy mapped centrally, or per-module.
- The test marker convention and where tests live.
- Async conventions — what is awaited, what runs in a thread pool.

## Commands

Read them from `pyproject.toml` and `Makefile`; they are the source of truth.
The usual set is `ruff check`, `ruff format --check`, `mypy`, and `pytest`.
Record which the project actually uses — plenty use `black` or `flake8` instead
of `ruff`, and running the wrong one teaches nothing.

## Where units land

| Area | Unit |
|---|---|
| routes, services, schemas, auth wiring | `hammer` |
| models, migrations, query cost | `hammer` + a `cartographer` call for anything that locks a table |
| design decisions across layers | `cartographer` |
| auth, permissions, input, secrets | `aegis` first, then `hammer` |

## Mistakes that recur here

- Reading the ORM object straight into a response and leaking a field.
- Writing a migration by hand and never testing `downgrade`.
- A `Session` shared across requests, or created at import time.
- N+1 queries that only appear once the data is real.
- Blocking I/O in an async handler.
- A migration that rewrites production data without being asked to.