---
name: Engineering Principles
description: Design and review principles for architecture, coupling, idempotency, caching, concurrency, immutability, and system design. Load for a non-trivial refactor, a reliability or performance decision, or any "how should this be structured" question.
---

# Engineering Principles

Condensed rules for everyday decisions. For the long-form treatment — with
conceptual examples, trade-off tables, and decision trees — read
`reference/deep-dive.md`, and load **only the section that matches the
question**. Never read the whole thing.

## Know when you are done thinking

Most principles exist to stop you building the wrong abstraction, not to make
you build a better one. Before applying any of this, confirm the problem is real,
the constraint is real, and a simpler thing would not have worked. Overthinking a
trivial change is the most common way this skill gets misused.

## Coupling

- Depend on the narrowest interface that gives you what you need.
- Two modules that always change together should be one module.
- A dependency in one direction only is worth more than any pattern.
- Do not add an abstraction before the third real implementation exists. Two is a
  coincidence; three is a pattern.
- Inline it once. Extract when it repeats, when it has a separate reason to
  change, or when it needs testing independently.

## SOLID, used sparingly

| Principle | Use it when | Do not use it to |
|---|---|---|
| SRP | a module has two unrelated reasons to change | split a file by line count |
| OCP | a type is extended constantly | pre-empt an extension nobody asked for |
| LSP | a subtype must be usable anywhere the parent is | justify a hierarchy you do not need |
| ISP | an interface forces callers to implement what they do not use | split every interface in two |
| DIP | a high-level module should not know its concrete detail | invert every dependency, including to leaf functions |

## Immutability

- Default to immutable values and one-way data flow.
- Mutability is fine when it is local, controlled, and obvious. Disallow it in
  shared state, and treat shared mutable state as the cause of every concurrency
  bug you will meet.
- Defensive copying at a boundary costs a little and removes a whole class of
  aliasing bug.

## Idempotency

Any operation that can be retried needs an answer before it is written:

- Is it naturally idempotent? A `PUT` to a fixed key usually is.
- Does it have an idempotency key the caller can replay?
- Is there a unique constraint that makes a duplicate impossible?
- Is there a state check — has this already been done?

If none of these hold, a retry will duplicate the effect. Say so in the design,
do not hope.

## Caching

Before adding a cache, answer:

- What exactly is the key?
- What invalidates it — write, time, or a dependency change?
- What happens on stale reads: serve stale, or block?
- How is a stampede prevented when a hot key expires?

Then: **is a cache even needed?** Measure first. A cache added before the query
was slow is complexity bought for nothing, and it is very hard to remove later.

## Concurrency

- Shared mutable state requires a lock, a queue, or immutability. There is no
  fourth option.
- Check-then-act is a race. Make it atomic, or accept the race explicitly.
- Keep locks short and ordered. Never hold one across a network call.
- Idempotent operations are what make retries and replays safe. Design for them
  before you need them, not after the incident.

## Boundaries and contracts

- Validate at the boundary; trust internally or not at all.
- Keep a module's public surface smaller than its implementation.
- An interface is a promise. Adding to it is cheap; changing it is expensive, so
  version it deliberately.
- A type that crosses a boundary is a contract. Make illegal states
  unrepresentable where the language allows it.

## Performance

- Measure, then change. Intuition about hot paths is usually wrong.
- Fix the algorithm before the constant factor; fix the query before the cache.
- The cheapest optimization is not doing the work at all.

## Decision rule

For any design question, in order:

1. What is the simplest thing that could work?
2. What does that cost us later?
3. Is the cost acceptable?
4. If not, what is the next simplest thing?

Stop at the first acceptable answer. Do not build for a requirement nobody has.