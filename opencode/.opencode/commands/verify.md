---
description: Run the project's checks and report honestly what passed
agent: warroom
---

Validate the current changes. Affected area: $ARGUMENTS

Load the `testing` skill. Work from `.opencode/brain/stack.md` — if it has no
verified commands for this area, say so rather than inventing one.

1. Run the fast checks for the affected area: lint, type check, build. Report
   the exact command and its exact output.
2. Run the test suite **only if this project runs it locally**. If CI owns the
   suite — and most projects' do — say that instead, and read the tests
   statically.
3. Report which changed behaviour has a test and which does not, as behaviour,
   not as a coverage percentage. A percentage hides gaps; a list does not.
4. List the missing failure paths and edge cases, and any test you predict will
   fail in CI, with the reason each will fail.

Rules:

- Never claim a check passed unless you ran it and saw it pass.
- Never weaken an assertion, delete a test, or add a skip to make something
  green. Report the problem instead.
- A failed check is a valid, useful result. Do not work around it.

Finish with a verdict: **pass**, **pass with gaps**, or **fail**, plus the
blocking reason and anything you could not verify.