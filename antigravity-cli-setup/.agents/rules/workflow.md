---
name: engineering-workflow
description: Standard workflow for implementing, debugging, reviewing, and validating repository changes.
---

# Engineering Workflow

Use this sequence unless the task clearly requires another order:

1. **Discover**
   - Inspect structure, relevant code, configuration, and existing tests.
   - Search for existing implementations before creating new ones.

2. **Plan**
   - Identify the affected components.
   - Consider dependencies, failure modes, edge cases, and compatibility.
   - For complex tasks, use planning mode and/or delegate independent research.

3. **Implement**
   - Make focused changes.
   - Follow existing project conventions.
   - Avoid speculative features.

4. **Validate**
   - Run targeted tests first.
   - Run lint/type/static checks when applicable.
   - Run broader validation when the change affects shared infrastructure.

5. **Review**
   - Inspect the final diff.
   - Check for accidental changes, security issues, dead code, duplicated logic, and missing tests.

6. **Report**
   - Summarize the change.
   - List validation performed.
   - Clearly identify anything not validated or any remaining risk.

## Parallel Work

Delegate independent, slow, or research-heavy work when useful:
- repository exploration
- documentation research
- test investigation
- independent validation

Do not delegate tightly coupled edits that require shared mutable state unless the work is isolated safely.
