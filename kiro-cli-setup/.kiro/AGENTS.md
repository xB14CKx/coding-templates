# AGENTS.md

## Purpose

This file defines the global behavior for the project AI agent.

## Core Behavior

- Inspect the existing project before making changes.
- Understand the current architecture before proposing modifications.
- Prefer simple, maintainable solutions over unnecessary complexity.
- Preserve existing behavior unless the task explicitly requires changing it.
- Do not introduce technologies, abstractions, patterns, or infrastructure without a concrete reason.
- Treat project documentation and existing code as sources of truth.
- Verify assumptions against the repository whenever possible.
- Consider failure cases, security, performance, maintainability, and testability.
- Keep changes focused on the requested task.
- Do not modify unrelated files.

## Engineering Reasoning

When a problem is encountered:

1. Identify the actual problem.
2. Identify constraints and existing architecture.
3. Consider relevant engineering concepts.
4. Compare simpler alternatives.
5. Evaluate trade-offs and failure modes.
6. Choose the smallest sufficient solution.
7. Implement only what is justified.
8. Verify the result.

General engineering concepts should be used as reasoning references, not as a checklist.

## Context Efficiency

Do not load every project context or specialist document for every task.

Use only the context and specialist material relevant to the current task.

General engineering knowledge should be treated as selective reference material rather than mandatory always-loaded context.
