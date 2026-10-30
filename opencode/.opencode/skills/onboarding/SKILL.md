---
name: Onboarding
description: Detect what a repository actually is — stack, layout, tooling, tests, CI, conventions — and record it in .opencode/brain/stack.md. Load on first contact with an unfamiliar project, or when a task hits something that contradicts what the brain says.
---

# Onboarding

Evidence, not assumption. Every conclusion needs a file that proves it.

## Pick the profile, read only that one

`reference/profiles/` holds a per-architecture playbook. Read **only** the one
that matches what you detected — each says where the code lives, what to verify
before writing anything, the commands this stack really uses, and the mistakes
that recur in it.

| Detected | Read |
|---|---|
| `pyproject.toml` / `requirements.txt` + web framework | `python-service.md` |
| `package.json` + Vite/Next/React/Vue/Svelte | `js-web.md` |
| `go.mod` | `go-service.md` |
| `Cargo.toml` | `rust.md` |
| `pubspec.yaml`, `*.xcodeproj`, `build.gradle.kts` + app | `mobile.md` |
| `notebooks/`, `dvc.yaml`, `*.ipynb`, pipeline config | `data-ml.md` |
| `*.tf`, `Dockerfile`, `k8s/`, `helm/`, CI deploy workflows | `infra.md` |
| workspace file (`pnpm-workspace`, `nx.json`, `go.work`, Gradle `include`) | `monorepo.md` |

A monorepo takes the monorepo profile **and** the profile for each language it
contains. Read the workspace one first — it decides how you survey.

If nothing matches, you are looking at an unusual project: follow the manifests
directly and record what you found. Do not force a profile that does not fit.

## Reconnaissance

Run these in parallel where possible. Cheap, and they cover most of the ground.

```sh
git rev-parse --show-toplevel          # where the repo really starts
ls -a                                  # top-level shape, hidden files included
cat package.json                       # JS/TS — deps, scripts, engines
cat pyproject.toml                     # Python — deps, tooling, entry points
cat requirements.txt                    # Python, unmodernised
cat go.mod                              # Go
cat Cargo.toml                          # Rust
cat build.gradle / pom.xml              # JVM
cat Gemfile                             # Ruby
cat composer.json                       # PHP
cat *.csproj                            # .NET
cat Makefile justfile Taskfile.yml      # the commands this project expects
cat .tool-versions .nvmrc .python-version  # pinned runtimes
```

Then, by area:

```sh
ls .github/workflows/ && cat .github/workflows/*.yml   # what CI actually runs
ls src app lib packages services cmd internal           # where the code lives
ls tests test spec __tests__                            # where the tests live
ls docs && ls .opencode                                  # what is already written
cat AGENTS.md CONVENTIONS.md CLAUDE.md                   # instructions that already exist
git log --oneline -20                                    # what is actually being worked on
```

## Fill in `stack.md`

Write `.opencode/brain/stack.md`. It is the file every other unit reads before
touching code, so it must be short and correct.

```md
# Stack

## Runtime
Language, version, package manager. Evidence: <path>

## Layout
<top-level dirs and what each one owns>. Evidence: <path>

## Commands
| Purpose | Command | Verified |
|---|---|---|
| install | `...` | no |
| run | `...` | yes |
| lint | `...` | no |
| typecheck | `...` | no |
| test | `...` | no |
| build | `...` | no |

Mark `Verified` only for a command you actually ran. An unverified guess here
propagates into every future task.

## Conventions
Real patterns, each with an example path: naming, layering, error handling,
module layout, test style.

## CI
What the pipeline runs, from the workflow file — not from assumption.

## Constraints
Locked dependencies, generated code that must not be hand-edited, files that
look editable and are not.
```

## Verify the commands

An unverified command in `stack.md` is worse than an empty one, because the next
unit will trust it. Run each one, or mark it unverified. Use `outrider` in the
background if several need running.

If a check is slow, skip running it and say so. Do not burn the user's time on
a full suite during onboarding.

## Keep it alive

`stack.md` is not written once. When a task reveals that a command, convention,
or constraint in it is wrong, correct it in the same operation. A stale brain is
worse than no brain.

## Do not

- Do not create a project-wide style guide. `CONVENTIONS.md` is a short list of
  real rules; this is a lookup, not documentation.
- Do not record a convention you saw once. Three examples make a convention;
  one makes an accident.
- Do not read source files to build this. Manifests and CI tell you what you
  need for a fraction of the cost.
- Do not overwrite an existing `stack.md` without reading it. Someone may have
  recorded a constraint they learned the hard way.