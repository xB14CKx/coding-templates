---
name: antigravity-workflow
description: Guides Antigravity through efficient project work using planning, focused edits, validation, and selective subagent delegation.
---

# Antigravity Workflow

## Before Work
- Inspect first.
- Identify the relevant files.
- For complex tasks, use `/planning`.
- Check whether independent research or validation can be delegated.

## Delegate When Useful
Good candidates:
- repository research
- documentation research
- independent test validation
- large searches
- slow builds

Avoid delegation when:
- tasks modify the same files concurrently
- the work depends on immediate shared state
- coordination overhead exceeds the task

## During Work
- Keep the main context focused.
- Ask subagents for findings, not unnecessary narration.
- Prefer targeted tool use.
- Do not repeatedly reread unchanged large files.

## After Work
- Inspect the diff.
- Validate.
- Reconcile subagent findings.
- Report remaining uncertainty.
