---
name: testing
description: Testing and validation rules for repository changes.
---

# Testing Rules

- Tests should verify behavior, not merely implementation details.
- Add or update tests when behavior changes or a regression risk is introduced.
- Prefer focused tests first, then broader validation.
- Cover failure paths and important edge cases, not only the happy path.
- Do not weaken assertions or remove tests just to make a change pass.
- Do not mock away the behavior actually being tested.
- Keep tests deterministic and isolated where practical.
- If a full test suite cannot be run, run the strongest available targeted validation and report the limitation.
