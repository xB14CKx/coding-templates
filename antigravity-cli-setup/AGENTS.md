# Antigravity Project Instructions

This repository uses `.agents/` for Antigravity CLI customizations.

Read the relevant `.agents/rules/` and activate/use skills when their descriptions match the task.

Core behavior:
- Inspect before editing.
- Keep changes focused.
- Follow repository conventions.
- Consider edge cases and failure paths.
- Protect secrets and sensitive files.
- Validate changes before declaring completion.
- Use specialized subagents for independent research or validation when useful.
- Never claim a test or command was run if it was not.
- Never silently ignore an error.

This file is intentionally short. Detailed instructions belong in `.agents/rules/` and `.agents/skills/` so Antigravity can use progressive disclosure.
