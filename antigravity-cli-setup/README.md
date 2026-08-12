# Antigravity CLI Project Template

This template is a stack-agnostic project setup for Google Antigravity CLI.

## Structure

- `.agents/rules/` — persistent project constraints and engineering workflow
- `.agents/agents/` — reusable specialized agents/subagents
- `.agents/skills/` — progressive-disclosure engineering knowledge
- `AGENTS.md` — short project entry point

## Recommended use

Copy `.agents/` and `AGENTS.md` into the repository root.

Then launch Antigravity CLI from that repository and inspect:

    /agents
    /skills
    /planning

Use `/permissions` to review tool permissions before allowing autonomous operations.

## Project-specific customization

Add project-specific rules or skills only when the repository has conventions that cannot be inferred reliably from its source/configuration.

Do not copy framework-specific assumptions into this base template.

## Token-efficiency strategy

Keep:
- always-relevant rules short
- specialist agents focused
- skills narrowly scoped
- deep references inside skill resources

Avoid one giant instruction file containing every engineering concept.

## Security

Review permissions before allowing destructive commands, network operations, credential access, or production-affecting actions.
