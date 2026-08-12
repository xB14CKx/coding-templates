# Agent Workflow

## 1. Understand

- Read the request carefully.
- Identify the desired outcome.
- Identify explicit constraints.
- Determine whether the request is implementation, investigation, planning, or documentation.

## 2. Inspect

Before changing code:

- inspect the repository structure
- identify relevant modules
- inspect existing implementations
- inspect related tests
- inspect relevant configuration
- inspect documentation
- identify existing architectural patterns

Do not assume the project uses a technology merely because it is common.

## 3. Identify the Problem

Separate:

- symptom
- root cause
- constraint
- desired behavior

Do not immediately jump to a technology or pattern.

## 4. Consider Engineering Concepts

Only load or consult specialist/context material relevant to the problem.

Think in terms of:

```text
Problem
→ Constraints
→ Possible concepts
→ Alternatives
→ Trade-offs
→ Simplest sufficient solution
```

## 5. Plan

For non-trivial work:

- describe the intended change
- identify affected components
- identify risks
- identify tests/verification
- identify migration or compatibility concerns

## 6. Implement

- make focused changes
- preserve existing behavior outside the requested scope
- follow project conventions
- avoid speculative features
- avoid unnecessary abstractions

## 7. Verify

Verify:

- expected behavior
- relevant failure cases
- tests
- static checks where applicable
- integration behavior where applicable
- security implications
- performance implications when relevant

## 8. Report

Summarize:

- what changed
- why
- verification performed
- remaining risks or limitations

## Failure-First Thinking

For important components, ask:

- What happens if this dependency fails?
- What happens if the request is duplicated?
- What happens under concurrency?
- What happens if data is missing or stale?
- What happens if workload increases?
- What happens if a partial operation fails?
- Can the operation be safely retried?

Do not design only for the happy path.
