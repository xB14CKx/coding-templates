# Stack

**Not yet detected.** Run `/onboard` to fill this in. Every unit reads this
before touching code, so an empty file here means every unit starts from
scratch.

Delete the template below when replacing it.

---

# Stack

> Detection evidence required. Every claim below cites a file. If you cannot
> cite it, you inferred it — mark it as an assumption.

## Runtime

- Language and version — evidence: `<path>`
- Package manager — evidence: `<path>`
- Pinning (`.tool-versions`, `.nvmrc`, `rust-toolchain`, …) — evidence: `<path>`

## Layout

| Directory | Owns |
|---|---|
| `<dir>` | <what lives here, one line> |

Include monorepo packages, and note which one is the one under active
development.

## Commands

Fill this in from `Makefile` / `justfile` / `package.json` scripts, then mark
each one **Verified** only if you actually ran it. An unverified command here
propagates into every later task as a false certainty.

| Purpose | Command | Verified |
|---|---|---|
| install | | no |
| run | | no |
| lint | | no |
| typecheck | | no |
| test | | no |
| build | | no |

## Conventions

Real patterns, each with an example path. Three examples make a convention; one
makes an accident.

- **Naming** —
- **Layering / module boundaries** —
- **Error handling** —
- **Tests** — location, naming, fixtures, markers
- **Formatting** — what the formatter enforces

## CI

What the pipeline actually runs, read from the workflow file. Note anything that
runs in CI but not locally — especially a suite you should not run locally.

## Constraints

- Generated code that must not be hand-edited.
- Files that look editable and are not.
- Locked dependencies or pinned versions.
- Anything the brain learned the hard way about this project's tooling.