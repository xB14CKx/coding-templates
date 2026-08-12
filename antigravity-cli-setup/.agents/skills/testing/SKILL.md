---
name: testing
description: Creates or improves tests and validation plans for changed behavior, including failure paths and edge cases.
---

# Testing

Determine:
- what behavior changed
- what existing tests cover it
- what regression could occur
- what edge cases matter

Then:
1. add/update focused tests
2. run targeted tests
3. run lint/type/static checks when available
4. run broader tests when justified

Never remove meaningful assertions simply to make tests pass.
