# Profile — JavaScript / TypeScript web

**Detect:** `package.json`, plus `next.config.*`, `vite.config.*`,
`angular.json`, or `nuxt.config.*`.

## Where things live

| Framework | Signal | Code lives |
|---|---|---|
| Next.js (app router) | `app/` directory, `layout.tsx` | `app/`, `components/`, `lib/` |
| Next.js (pages) | `pages/` directory | `pages/`, `components/`, `utils/` |
| Vite + React | `vite.config.*`, `index.html` | `src/` |
| SvelteKit | `svelte.config.js`, `routes/` | `src/routes/` |
| Angular | `angular.json`, `*.module.ts` | `src/app/` |

Monorepos: `pnpm-workspace.yaml`, `turbo.json`, `nx.json`, or a `workspaces`
key. Map every package and note which is under active development.

## Check before writing

- **Package manager.** The lockfile decides: `pnpm-lock.yaml`, `yarn.lock`,
  `bun.lockb`, `package-lock.json`. Never run the wrong one — it rewrites the
  lockfile and creates a diff nobody asked for.
- **The installed version of every library you touch.** Read it from
  `node_modules/<pkg>/package.json`, not from memory. Major versions here have
  breaking changes that are easy to get wrong.
- **React version.** 18 and 19 differ in how effects and forms behave.
- **Server or client.** In a framework that does both, a file's location
  determines which APIs are available. Getting this wrong fails at build time
  with a confusing error.
- **CSS approach** — Tailwind, CSS modules, styled-components, vanilla. Follow
  what exists; do not introduce a fourth.
- **TypeScript or not.** If there is no `tsconfig.json`, it is a JavaScript
  project. Never run `tsc` — it is not installed, prints a misleading message,
  and can exit 0 without checking anything. That is a false pass.

## Commands

```sh
pnpm lint        # or npm / yarn / bun — read package.json "scripts"
pnpm typecheck   # tsc --noEmit, only if tsconfig.json exists
pnpm test
pnpm build
```

Record which exist. `package.json` `scripts` is the source of truth; a guessed
command that silently does nothing is worse than none.

## Where units land

| Area | Unit |
|---|---|
| components, hooks, styling, a11y, layout | `mason` |
| API routes, server actions, server-side data | `hammer` |
| build config, bundling, CI | `hammer` |
| library API or version behaviour | `cipher` |
| anything user-visible | `mason` first, review afterwards |

## Mistakes that recur here

- The wrong package manager, silently rewriting the lockfile.
- Hand-editing a lockfile instead of running the install.
- A `useEffect` doing what a derived value should do — an effect that sets state
  which could have been computed.
- Missing dependency in an effect array, or an object literal in one.
- Rendering user content as HTML.
- A secret in a `NEXT_PUBLIC_` / `VITE_` / `PUBLIC_` variable. It ships to the
  browser; it is public from the moment it is bundled.
- Optimizing before measuring: blanket `memo` everywhere.
- An i18n key that does not exist. Treat a missing key as a defect, not a
  fallback to the raw string.