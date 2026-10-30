---
name: Testing
description: Creates and improves tests for changed behaviour, including failure paths and edge cases. Load when writing or changing a test, when a behaviour change needs coverage, or when asked what is untested.
---

# Testing

A test earns its place by failing for a reason. A test that passes whether or not
the feature exists is worse than no test — it is a false signal that costs more
than the gap it hides.

## Before writing

- What behaviour changed? Name it as a sentence. If you cannot, the task is not
  clear enough to test.
- What already covers this? Extend the existing test rather than adding a
  parallel file.
- What is the project's runner, location, naming, and fixture convention? Copy
  the nearest test file and match it exactly.

## What to cover

Ranked by how often each one actually fails in production:

1. **The failure path** — the error the code is supposed to handle. Usually the
   one that is missing.
2. **Boundaries** — empty, one, many, zero, negative, maximum, just past maximum.
3. **Null and absent** — missing key vs null value vs empty string are different
   inputs and often different bugs.
4. **The regression** — a test that reproduces the bug you just fixed. This is
   the highest-value test in the whole change.
5. **Concurrency** — only where the code is actually concurrent.
6. **The happy path** — yes, but last, and once. It is the case you already know
   works.

## Assertions

- Assert the **behaviour**, not the implementation. A test that asserts an
  internal call sequence breaks on every refactor and catches no bugs.
- One reason to fail per test. If a failure message lists six assertions, the
  reader cannot tell which one matters.
- A failing message must say what was expected and what happened.
- Do not assert on log output, exact error strings, or timestamps unless those
  are the contract.

## Determinism

A test that passes in CI and fails on a laptop is worse than no test.

- No wall-clock time. Inject it.
- No network. Mock the boundary, not the behaviour under test.
- No shared mutable state between tests. No ordering dependency.
- No dependence on another test having run first.
- Clean up what you create — temp files, rows, background jobs.

## Absolute rules

- **Never weaken an assertion, delete a test, or add a skip** to get a green
  result. That is not a shortcut, it is deleting the evidence.
- **Never mock away the thing under test.** Mock the slow, flaky, or external
  boundary; leave the logic real.
- Never mock a framework type you do not own — a mock of the ORM or the HTTP
  layer tests your mock, not your code.
- A skipped test with no reason is a bug. A skipped test with an issue link is a
  decision.

## Finishing

- Run the suite if the project runs it locally. If CI owns it, say that instead
  of guessing — and then say plainly that the change is unverified until CI runs.
- Review your own diff before reporting: does every new test fail without the
  change? If you did not check that, say so rather than claiming it is proven.
- Report coverage as behaviour covered and behaviour not covered — not a
  percentage, which is a number that hides gaps rather than showing them.