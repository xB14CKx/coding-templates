---
name: core-engineering
description: Core engineering behavior for every task in this repository.
---

# Core Engineering Rules

## Understand Before Editing
- Inspect the repository structure and relevant files before making changes.
- Identify existing conventions, dependencies, tests, configuration, and integration points.
- Reuse existing abstractions when they are correct; do not create parallel implementations without a reason.
- Do not assume a framework, database, service, or runtime is present. Verify it.

## Scope Control
- Implement the smallest complete change that satisfies the request.
- Do not refactor unrelated code.
- Preserve existing behavior unless the task explicitly changes it.
- Do not add dependencies unless they solve a demonstrated need.

## Correctness
- Handle normal paths, failure paths, boundary conditions, and invalid inputs.
- Prefer explicit behavior over clever behavior.
- Keep business rules separate from infrastructure concerns where practical.
- Preserve data integrity and transactional boundaries.

## Exceptions
- Treat exceptions as part of the design, not as an afterthought.
- Catch exceptions only when the layer can meaningfully handle or translate them.
- Never silently swallow failures.
- Do not use broad exception handling to hide programming errors.
- Preserve useful error context while avoiding secret leakage.

## Changes
Before editing:
1. State what needs to change internally.
2. Locate the smallest relevant set of files.
3. Check for tests or validation that should cover the change.

After editing:
1. Inspect the diff.
2. Run the most relevant validation available.
3. Fix regressions caused by the change.
4. Report what changed and what was validated.
