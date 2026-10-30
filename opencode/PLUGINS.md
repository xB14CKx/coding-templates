# Plugin Guide

**You do not need any plugin for this template to work.** It is self-contained:
ten units, ten commands, nine skills, the brain, and the safety rails are all
in `.opencode/`. Nothing below is installed.

This page exists for one reason: to tell you what *not* to install.

## Do not install a second orchestrator

The OpenCode ecosystem has several excellent full orchestrators. All of them
ship their own agent roster. Installing one alongside this template gives you
two orchestrators, two sets of read-only auditors, and no reliable routing
between them — the model will pick between `warroom` and the other one on every
task.

| Plugin | Conflict |
|---|---|
| `@bluelovers/opencode-arise` | Ships its own Monarch + shadow army. Same job, different names. |
| `oh-my-opencode` | Its own curated agent set and background tools. |
| `opencode-ensemble` | Parallel agent teams — overlaps the `dispatch` skill. |
| `opencode-conclave` | Multi-agent debates. Different protocol, same namespace. |
| `opencode-dynamic-workflows` | Script-as-orchestrator. Replaces `warroom` entirely. |
| `opencode-mission-control` | Worktree isolation plus DAG plans — parallel *and* orchestration. |
| `flowdeck` | Full workflow orchestration with its own agents. |

If you want one of these, that is a reasonable choice — it is a different
template, not an addition to this one. Pick it over this, not alongside it.

## Two more worth skipping

- **Any memory plugin** (`harness-memory`, `opencode-supermemory`, `honcho`,
  `opencode-mem`). These compete directly with `.opencode/brain/`. Running both
  means two sources of truth that drift apart, and a wrong memory is worse than
  no memory. The brain has one advantage: it is committed and reviewable in a
  pull request.
- **Any secret-redaction plugin** (`opencode-vibeguard`, `envsitter-guard`).
  Block 1 of `opencode.jsonc` already hard-denies reads of `.env`, `Secrets/`,
  `.ssh`, `.aws`, `.npmrc`, and private keys, and that deny cannot be lifted by
  a prompt or a saved approval. A second layer is defensible only in an
  environment where this config gets edited away.

## If you ever do install one

```sh
opencode plugin add <name>
opencode plugin list
```

Then re-run both checks — a plugin can rewrite config or permissions, which
would silently undo Block 1:

```sh
node .opencode/scripts/policy-check.js
node .opencode/scripts/verify-template.js
```

Pin the version. An unpinned plugin updates itself when its author publishes,
with no review step between that and your sessions:

```jsonc
{ "plugins": ["<name>@<exact-version>"] }
```

The one place a plugin would genuinely help is context pruning — a five-unit
fan-out buries you in superseded tool output. If you ever feel that, install
`opencode-dynamic-context-pruning` alone. It adds no agents and nothing to
collide with.