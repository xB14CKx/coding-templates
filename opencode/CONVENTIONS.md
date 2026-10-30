# Conventions

Project-specific rules. Everything general already lives in `AGENTS.md` and the
skills — do not duplicate them here.

**Fill this in during `/onboard`.** Every rule needs an example path, and a rule
you cannot point at is a rule you are guessing at.

## Stack

- **Language / runtime:**
- **Package manager:**
- **Test runner:**

## Layout

- `<dir>` —
- `<dir>` —

## Commands

| Purpose | Command | Verified |
|---|---|---|
| install | | |
| run | | |
| lint | | |
| typecheck | | |
| test | | |
| build | | |

Mark **Verified** only for a command you actually ran. An unverified command
here becomes a false certainty in every later task.

## Rules

Only real rules, each with an example path.

- **Naming** —
- **Layering** — what may import what
- **Error handling** —
- **Tests** — location, naming, fixtures, markers
- **Formatting** — what the formatter enforces
- **Generated code** — what must not be hand-edited

## CI

What the pipeline runs, and anything it runs that you should not run locally.

## Never

Project-specific prohibitions, with the reason attached. A rule without a reason
gets deleted by the next person who disagrees with it.

-