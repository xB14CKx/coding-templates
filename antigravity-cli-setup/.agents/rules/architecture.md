---
name: architecture
description: Architecture principles for maintainable systems and cross-cutting engineering decisions.
---

# Architecture Principles

Prefer:
- clear separation of responsibilities
- cohesive modules
- explicit dependencies
- stable interfaces
- dependency inversion where it reduces coupling
- immutable data where practical
- idempotent operations where retries are possible
- caching only when there is a clear consistency strategy
- asynchronous/background processing only when it provides a real benefit
- explicit transactional boundaries
- observable failure behavior

Consider:
- SOLID principles
- design patterns only when they simplify the design
- concurrency and race conditions
- retries and duplicate delivery
- cache invalidation
- message ordering
- timeouts and partial failures
- backward compatibility
- resource limits

Do not apply architectural patterns mechanically. Explain tradeoffs when a decision materially affects maintainability, correctness, performance, or reliability.
