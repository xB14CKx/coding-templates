# .kiro Project Agent Template

This directory is a reusable baseline for AI-assisted software projects.

## Structure

```text
.kiro/
├── AGENTS.md
├── README.md
├── rules.md
├── workflow.md
│
├── context/
│   ├── backend.md
│   ├── frontend.md
│   ├── database.md
│   └── testing.md
│
└── specialists/
    ├── backend.md
    ├── frontend.md
    ├── database.md
    └── security.md
```

## Responsibilities

### AGENTS.md

Global agent behavior and engineering reasoning.

### rules.md

Project-specific constraints that the agent must obey.

### workflow.md

The process the agent should follow when analyzing, planning, implementing, testing, and verifying work.

### context/

Project facts.

These files should describe what is actually true about the current project. They should be updated when the architecture changes.

### specialists/

Domain-specific reasoning guidance.

These files should explain how to reason about a particular area rather than prescribing a specific programming language or framework.

## Reusability

This template intentionally does not assume:

- a programming language
- a frontend framework
- a backend framework
- a database
- a cloud provider
- a message broker
- a caching technology

The project should establish those details in its own context after repository inspection.

## Context Efficiency

Keep always-loaded instructions small.

Load detailed context and specialist knowledge only when relevant to the current task.

The objective is:

```text
Small always-loaded context
        +
Relevant project context
        +
Relevant specialist knowledge
        ↓
Efficient agent reasoning
```
