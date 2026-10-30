---
name: Workflow
description: The standard order of operations for any multi-step task in this repo. Load before planning or implementing anything. Classifies intent, recalls prior knowledge, plans the smallest complete diff, implements, validates, and reports.
---

# Workflow

## 1. Classify

Exactly one intent: **build · fix · review · plan · research · secure · document
· ship**. Do not blend two unless the user asked for both. If the intent is
genuinely ambiguous, ask one question — not three.

If it is `fix` and the cause is unknown, that is `examiner`, not `hammer`.
If it is `plan`, that is `cartographer`, and nothing gets edited.

## 2. Recall

Before working an area you have not touched this session:

```sh
grep -i "<area>" .opencode/brain/INDEX.md
```

Read only the entries that match. Never load the whole brain — it is a lookup
table, not a manual. Details in the `second-brain` skill.

Then read `CONVENTIONS.md` and `.opencode/brain/stack.md` if the area is governed
by either.

## 3. Inspect

- Locate the existing implementation. **Extend it.** A second implementation of
  something that already exists is a defect, not an improvement.
- Verify the framework, version, and idiom before writing code for it. The
  lockfile and the manifest beat memory.
- Find the integration points: callers, tests, config, CI. A change that breaks
  a caller is not a change that is done.
- Check whether the thing already exists somewhere. It usually does.

Stop when the question is answered. Do not keep reading because there is more
code.

## 4. Plan

Small enough to skip: the plan is the next edit.
Anything more: write it down, then hand it to `hammer`.

The plan is the **smallest complete diff** — complete, because a partial change
is a broken one, and smallest, because everything else is unrequested change.

For each step, name the exact file. A plan that says "update the service layer"
is not a plan.

## 5. Implement

`hammer`, with the file set fixed by the plan. Anything the plan did not
anticipate gets reported, not improvised — an unanticipated requirement means the
plan was wrong, and that is worth knowing.

## 6. Validate

Run the check for the affected area from `.opencode/brain/stack.md`:

- **Fast check** — lint, type check, or build. Run this. It is cheap.
- **Full suite** — run it when the project expects it locally, or when the
  change touches a trust boundary. Follow the project's convention; if CI owns
  the suite, say so instead of guessing.
- **Nothing was run** is a valid report. A false "tests pass" is not.

If a check cannot run, report the exact failure. Never report a result you did
not observe.

## 7. Report

One answer, not a transcript:

- **Files changed** — path and one line each.
- **What changed** — in the terms of the request, not the diff.
- **Verified** — the command and its real result.
- **Not verified** — anything you could not check, stated plainly.
- **Risks** — only if there are real ones.

Then stop. Do not offer next steps the user did not ask for.

## Know when to stop

You are done when the requested behaviour exists, the check passes, and nothing
unrequested changed. Extra polish, adjacent refactors, and unasked-for features
are not finishing the task — they are a new task, and they cost the user review
attention they did not budget for.