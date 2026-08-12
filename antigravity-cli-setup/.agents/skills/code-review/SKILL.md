---
name: code-review
description: Reviews code or diffs for correctness, maintainability, edge cases, security, performance, and test coverage.
---

# Code Review

Review in this order:

1. Correctness
2. Regression risk
3. Error and exception handling
4. Security
5. Data integrity
6. Concurrency/idempotency
7. Performance
8. Maintainability
9. Tests
10. Scope creep

For every meaningful finding:
- identify the file and relevant area
- explain the failure or risk
- provide a concrete recommendation

Do not report stylistic preferences as defects unless they conflict with repository conventions.
