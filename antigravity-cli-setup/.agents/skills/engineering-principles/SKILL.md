---
name: engineering-principles
description: Applies SOLID, immutability, idempotency, caching, messaging, concurrency, design patterns, and system design principles when making or reviewing engineering decisions.
---

# Engineering Principles

Use this skill when a task involves architecture, non-trivial refactoring, reliability, concurrency, performance, or design decisions.

## SOLID
Use principles to reduce coupling and improve changeability. Do not split code into abstractions merely to satisfy a principle.

## Immutability
Prefer immutable values and one-way data flow when it reduces accidental state mutation. Mutability is acceptable when it is local, controlled, and justified.

## Idempotency
For retried requests, jobs, webhooks, and message processing, determine whether repeated execution can duplicate effects. Use idempotency keys, unique constraints, state checks, or safe upserts when appropriate.

## Caching
Before adding a cache, identify:
- what is cached
- cache key
- TTL/invalidation strategy
- consistency expectations
- stampede behavior
- failure behavior

## Streaming and Messaging
Consider:
- delivery semantics
- duplicate messages
- ordering
- retries
- dead-letter handling
- backpressure
- observability

## Concurrency
Look for:
- race conditions
- shared mutable state
- deadlocks
- lost updates
- transaction isolation problems
- unsafe async/sync boundaries

## Design Patterns
Use patterns only when they make the design clearer or safer. Prefer simple composition over unnecessary abstraction.

## System Design
For significant changes, consider:
- availability
- consistency
- scalability
- latency
- failure isolation
- observability
- operational complexity
- cost

## Decision Rule
Do not optimize for theoretical architecture. Choose the simplest design that satisfies current requirements while leaving a sensible path for future change.
