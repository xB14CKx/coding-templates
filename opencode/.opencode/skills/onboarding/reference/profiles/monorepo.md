# Profile — Monorepo

**Detect:** `pnpm-workspace.yaml`, `turbo.json`, `nx.json`, `lerna.json`,
`go.work`, a `Cargo.toml` workspace section, `settings.gradle.kts` with
`include`, or a `workspaces` key in `package.json`.

## The map is the first deliverable

Before any other work, build a table:

| Package | Path | Owns | Language | Build command |
|---|---|---|---|---|
| `<name>` | `<path>` | <one line> | <lang> | `<cmd>` |

Then note: which package is being worked on, which depend on it, and whether
the dependency graph is directed by the build tool or only by convention.

## Check before writing

- **The task graph tool** — Turborepo, Nx, Bazel, Gradle, Cargo workspaces, Go
  workspaces. Each has different caching and affected-target semantics.
- **Cache correctness.** If tasks cache on a computed hash, a task with an
  undeclared input will serve a stale cache. This is the defining bug class of
  monorepos.
- **Where shared code lives** — a `packages/`, `libs/`, or `shared/` directory,
  and the rule for what is allowed in it. A shared module that grows without a
  boundary becomes a dependency bottleneck.
- **Internal dependency declarations.** A package importing another without
  declaring it will fail the build at the worst moment.
- **Version policy** — fixed, caret, or workspace protocol. A monorepo with
  real version ranges between internal packages reintroduces every dependency
  problem npm was trying to solve.

## Commands

Most of the meaningful commands are scoped, not global. Record the scoped form:

```sh
turbo run test --filter=<pkg>       # not `turbo run test` across everything
nx test <pkg>
cargo test -p <crate>
go test ./pkg/...
```

A root-level `make test` in a large monorepo can take twenty minutes. Record
the scoped command so units do not run the whole thing on a two-file change.

## Where units land

Monorepos parallelize well, because package boundaries are natural partitions —
**and that is exactly where the partitioning rule comes from.** Use the `dispatch`
skill and partition by package.

| Area | Unit |
|---|---|
| one package's code | `hammer`, one per package |
| a shared package touched by several | `hammer` **first, alone** — everything else depends on it |
| build graph, dependency rules, migration | `cartographer` |
| a change that must land in N packages atomically | `cartographer` first — decide the order |

## Mistakes that recur here

- Changing a shared package and forgetting the consumers that break.
- Running a root-wide command that takes twenty minutes for a two-file change.
- A cache key missing an input, producing a stale "successful" build.
- Two packages each solving the same problem, instead of one shared package.
- A circular dependency introduced by an import that seemed harmless.
- Trusting the root lockfile is the whole story — it is, but only if every
  internal package declares its dependencies correctly.