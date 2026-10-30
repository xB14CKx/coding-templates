---
description: Review the current changes for defects, risks, and missing tests
agent: warroom
---

Review the current changes: $ARGUMENTS

Load the `code-review` skill. Review the actual diff — read the code, do not
review the commit message.

Work in this order and stop reporting once you are past the level the change
deserves: correctness, regression risk, error and exception handling, security,
data integrity, concurrency and idempotency, performance, maintainability,
tests, scope creep.

Use the units instead of doing it all yourself:

- Task `outrider` in the background to gather the diff, the affected call sites,
  and the existing test coverage — it is read-only, so it costs nothing to run
  alongside.
- Task `aegis` in the background if the change touches a trust boundary:
  auth, permissions, input handling, secrets, uploads, or outbound requests.

For every finding: file, line, the concrete failure, and the fix. Verify each
one against the real code before reporting it. Report scope creep explicitly —
files and lines this task did not require.

Never weaken an assertion, delete a test, or add a skip to get past a finding.

Finish with a verdict: **ship**, **ship with changes**, or **hold**. If nothing
material is found, say that in one line. Do not pad the review.