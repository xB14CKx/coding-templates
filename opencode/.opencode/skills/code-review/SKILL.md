---
name: Code Review
description: Reviews code or diffs for correctness, regression risk, error handling, security, data integrity, concurrency, performance, maintainability, test coverage, and scope creep. Load when reviewing a change, before reporting work complete, or when asked for a second opinion.
---

# Code Review

Review against the code, not against the description of the code. A commit
message is a claim from the author; the diff is the evidence.

## Order

Work down this list and stop reporting once you are past the level the change
deserves. A three-line fix does not need a concurrency audit.

1. **Correctness** — does it do what was asked, on the inputs that actually
   occur?
2. **Regression risk** — what existing caller, test, or invariant does this
   break?
3. **Error handling** — what happens on failure, on partial failure, on retry?
4. **Security** — trust boundaries, injection, authorization, secrets.
5. **Data integrity** — transactions, constraints, idempotency, migration safety.
6. **Concurrency** — shared state, interleaving, check-then-act, deadlocks.
7. **Performance** — N+1 queries, missing indexes, unbounded work, render cost.
8. **Maintainability** — does it read like the code around it?
9. **Tests** — does the change's behaviour have one?
10. **Scope creep** — anything the task did not require.

## What to actually look for

**Correctness**
- Off-by-one, inclusive vs exclusive bounds, empty and single-element cases.
- `null` vs missing vs empty — three different things, often conflated.
- Truthiness bugs: `0`, `""`, `[]`, and `False` are falsy.
- Early return that skips cleanup, logging, or a transaction commit.
- A condition that is inverted.

**Error handling**
- Swallowed exceptions, `catch` that logs and continues, bare `except`.
- An error message that leaks a stack trace, SQL, or an internal id.
- A failure path that leaves partial state behind.

**Data integrity**
- A migration without a working, reviewed downgrade.
- A write without a transaction, or a transaction spanning a network call.
- A retry that can apply an effect twice. Idempotency key, unique constraint,
  or a state check.
- A schema change that locks a large table without saying so.

**Concurrency**
- Read-modify-write without a lock or an optimistic check.
- Mutable module-level or class-level state shared across requests or workers.
- A cache with no invalidation, or one that can stampede.
- `await` inside a loop where the calls are independent.

**Tests**
- Does a test exist for the behaviour this change adds or alters?
- Does it assert behaviour, or restate the implementation?
- Is it deterministic — no wall clock, no network, no ordering dependency?
- Was an assertion weakened, a test deleted, or a skip added?

**Scope creep**
- Files the task did not require. This is a finding, not a nitpick: the author
  has to review them.

## Rules

- Every finding: file, line, the concrete failure, and the fix. A finding
  without a concrete failure is a preference, and preferences belong in a
  separate, clearly labelled list.
- Verify against the real code before reporting. Open the file.
- **Never weaken an assertion, delete a test, or add a skip to make something
  pass.** Report the problem instead.
- Rank by severity, not by discovery order.
- If nothing material is found, say so in one line. Do not pad a review — a
  report of twelve trivia items buries the one real defect and teaches the
  reader to skim.

## Output

1. **Verdict** — ship, ship with changes, or hold.
2. **Findings** — severity-ordered, each with location, failure, fix.
3. **Preferences** — clearly separated, clearly optional.
4. **Unverified** — what you could not check and why.