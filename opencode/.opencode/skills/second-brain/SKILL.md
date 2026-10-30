---
name: Second Brain
description: The project's durable memory. Load to recall prior knowledge before working an unfamiliar area, to record a decision or pitfall after a task, or to distil the brain when it grows too large. Defines the recall, record, and distil protocols for .opencode/brain/.
---

# Second Brain

`.opencode/brain/` is what this project knows that the code does not say. It is
committed, shared, and cheap to grep — which is the entire point. A brain nobody
finds is a brain nobody has.

## Shape

```
brain/
├── INDEX.md        one line per entry — read this, grep this
├── stack.md        detected stack, commands, conventions, constraints
├── decisions/      why things are the way they are (ADRs)
├── patterns/       how this codebase does a recurring thing
├── pitfalls/       what broke, and how it was fixed
└── inbox.md        captures that have not been filed yet
```

The split matters. A note in `pitfalls/` tells the next unit not to repeat a
mistake; the same note in `inbox.md` tells it nothing.

## Recall — before the work

When a task touches an area you have not touched this session:

```sh
grep -i "<area, module, concept>" .opencode/brain/INDEX.md
```

Then read only the matching entry, and only the file it points to.

```md
| area | note | |
|---|---|---|
| billing | retry storms after webhook timeout | pitfalls/webhook-retries.md |
```

Recall rules:

- **Never load the whole brain.** `INDEX.md` is a lookup table; entries are the
  content. Loading everything is how a 40-line index becomes a 4,000-token tax
  on every task.
- Recall **before** inspecting code. The point is to know what to look for.
- A brain entry is a claim about the past. It outranks your prior, and it loses
  to the code in front of you. If they disagree, the code is right and the entry
  is stale — fix the entry.

## Record — after the work

Record when a task produced something non-obvious. That is the whole bar; most
tasks do not produce it.

**Worth recording**

- A decision that was not forced by the code, and would be relitigated without
  it → `decisions/`.
- A bug whose cause was not where anyone expected → `pitfalls/`.
- A way of doing something in this codebase that took three tries to find →
  `patterns/`.
- A constraint nobody would guess from the code (a runtime quirk, an env
  requirement, a CI timeout) → `patterns/` or `stack.md`.

**Not worth recording**

- What the code plainly says. The code is already the record.
- Anything you learned from one source and have not confirmed.
- Anything that is true for a moment. Work in progress is not knowledge.

Entry shape — short, cited, dated:

```md
# Webhook retries cause a storm, not a failure

**Area:** billing/webhooks · **Recorded:** 2026-03-11

The provider retries any request that takes longer than 5s. Our handler called
the downstream API synchronously, so one slow upstream produced 12 identical
charges.

**Rule:** acknowledge first, process asynchronously. Evidence:
`src/billing/webhook.ts:44`, incident in `#incident-221`.

**Fix:** queue the payload and return 200 within 500ms.
```

Then add exactly one line to `INDEX.md`. An entry that is not in the index does
not exist.

## Distil — when it grows

Run this when `INDEX.md` passes roughly 80 lines, or on a recurring cadence.

1. **Merge duplicates.** Two notes on the same subject become one.
2. **Delete what the code now says.** A note about behaviour that has since
   changed is worse than nothing — it actively misleads.
3. **Delete what stopped being true.** Superseded decisions get one line in the
   old ADR saying it was superseded, with a link. Never delete history.
4. **Promote patterns.** A pitfall that has happened three times is a rule.
   Move it to `patterns/` and reference it from `CONVENTIONS.md`.
5. **Empty the inbox.** Anything still unfiled after a month is not going to be
   filed. Delete it.

The budget is roughly **30 entries, 2,000 words**. A brain past that budget has
stopped being recall and become an archive nobody reads. If you cannot fit it,
it was not worth writing down.

## Rules

- **Cite evidence.** Every claim carries a `path:line`, a command output, or a
  named incident. An uncited note is a rumour, and it will be trusted.
- **Never record a secret.** Names of files and variables are fine; values are
  not.
- **One subject per entry.** An entry covering three things gets recalled for
  one of them and skipped for the rest.
- **Write before you finish the task**, not at some later point. A note written
  from memory a day later is a note that is wrong.
- **Correct, do not append.** A brain with two contradictory entries is worse
  than a brain with one.
- **The brain describes the project, not the session.** "The user asked me to
  try Postgres" is not knowledge. "This project uses Postgres; here is the
  evidence" is.
- **Brain edits are always allowed** — no permission prompt, for any unit. If a
  unit finds itself wanting to record something and being blocked, that is a
  bug in the setup.