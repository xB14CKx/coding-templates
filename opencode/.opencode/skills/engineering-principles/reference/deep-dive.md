# System Engineering Knowledge

## Purpose

This is a **tool-agnostic engineering knowledge base** intended for use by AI coding assistants, coding agents, IDE assistants, CLI agents, review tools, automation systems, and human developers.

It is **not specific to Kiro, Antigravity, Claude Code, Cursor, Copilot, or any other tool**.

Its purpose is to help an engineering assistant reason about:

- what a concept means
- what problem it solves
- what scenarios it applies to
- what problems it can prevent
- when it may be unnecessary
- what trade-offs and failure modes it introduces
- how it relates to other system-design concepts
- how to choose between competing solutions

The knowledge base should remain **programming-language-, framework-, vendor-, and tool-agnostic**.

Specific technologies may be mentioned as examples, but examples must never become requirements.

The preferred reasoning model is:

**Problem → Context → Constraints → Evidence → Possible Concepts → Trade-offs → Simplest Sufficient Solution → Verification**

Avoid:

**Technology → Find a reason to use it**

---

# 1. How This Knowledge Should Be Used

This is a **reference knowledge source**, not a mandatory instruction set.

An AI tool should retrieve or load only the knowledge relevant to the current task whenever possible.

Loading the entire knowledge base into every task can:

- increase token/context usage
- distract the assistant with irrelevant information
- encourage unnecessary abstraction
- encourage technology-first decisions
- increase the risk of overengineering

The knowledge should therefore be treated as **on-demand engineering reference material**.

## Separation of Concerns

A project may contain several different information layers:

### Layer 1 — Tool Instructions

Tool-specific files define how a particular assistant behaves.

Examples may include:

```text
AGENTS.md
rules.md
workflow.md
tool-specific configuration
```

These files belong to the tool or project configuration.

They should **not contain the entire engineering knowledge base**.

### Layer 2 — Project Context

Project-specific information answers:

> "What is this particular project?"

Examples:

```text
context/
├── backend.md
├── frontend.md
├── database.md
└── testing.md
```

Project context should describe the actual architecture, constraints, conventions, and requirements of the project.

### Layer 3 — Engineering Knowledge

General engineering concepts answer:

> "What engineering concept may help solve this problem?"

Examples:

```text
knowledge/
├── fundamentals/
├── api/
├── database/
├── distributed/
├── performance/
├── security/
├── testing/
├── architecture/
└── data/
```

This layer should remain reusable across projects and tools.

### Layer 4 — Tool Adapter

If a tool requires a special location or format, create a small adapter/reference entry that points toward the shared knowledge.

For example:

```text
Tool A configuration
        ↓
Shared engineering knowledge

Tool B configuration
        ↓
Shared engineering knowledge

Tool C configuration
        ↓
Shared engineering knowledge
```

Do not duplicate the knowledge itself merely because multiple tools are used.

---

# 2. Core Engineering Reasoning

The knowledge base exists to improve **problem-solving**, not to increase the number of technologies used.

For every engineering problem, reason through:

## Step 1 — Identify the Problem

What concrete problem exists?

Examples:

- repeated expensive reads
- slow requests
- duplicate operations
- concurrent updates
- unreliable external dependencies
- difficult-to-maintain code
- excessive coupling
- inconsistent state
- unauthorized access
- difficult debugging
- growing workload
- resource exhaustion

## Step 2 — Understand the Context

Determine:

- current architecture
- workload
- data characteristics
- dependencies
- operational environment
- expected behavior
- existing constraints
- existing implementation

Do not propose architectural changes before understanding the current system.

## Step 3 — Inspect or Measure

Prefer evidence over assumptions.

Look for:

- performance bottlenecks
- database query patterns
- latency
- error rates
- resource consumption
- concurrency behavior
- logs
- metrics
- traces
- security weaknesses
- test failures
- dependency behavior

## Step 4 — Identify Possible Concepts

Multiple concepts may solve the same problem.

Example:

```text
Repeated expensive reads
        ↓
Query optimization
        ↓
Database indexes
        ↓
Caching
        ↓
Read replicas
```

The correct choice depends on the actual constraints.

## Step 5 — Evaluate the Simplest Sufficient Solution

Before introducing:

- infrastructure
- distributed systems
- queues
- caches
- abstractions
- design patterns
- additional services

ask whether the problem can be solved more simply.

Possible simpler solutions include:

- better code
- validation
- a database constraint
- an index
- query optimization
- reducing unnecessary work
- correcting a bug
- improving an existing component

## Step 6 — Evaluate Trade-offs

For each proposed solution consider:

- complexity
- operational cost
- maintenance burden
- failure modes
- testing requirements
- debugging difficulty
- consistency implications
- performance impact
- security implications
- migration cost

## Step 7 — Implement Incrementally

Prefer the smallest change that solves the demonstrated problem.

## Step 8 — Verify

Use appropriate evidence:

- tests
- benchmarks
- logs
- metrics
- traces
- database query plans
- load testing
- security testing
- correctness checks

---

# 3. Preventing Knowledge-Induced Overengineering

The engineering knowledge should never become a checklist such as:

```text
□ Redis
□ Kafka
□ Microservices
□ Factory
□ Singleton
□ Cache
□ Queue
□ Circuit breaker
```

Instead:

```text
Problem
    ↓
Context
    ↓
Constraints
    ↓
Possible concepts
    ↓
Simplest sufficient solution
    ↓
Trade-offs
    ↓
Implementation
    ↓
Verification
```

A concept should be applied only when it provides a meaningful benefit for the observed scenario.

Technology examples such as Redis, Kafka, RabbitMQ, PostgreSQL, Celery, or PostgREST are references for possible implementations, not recommendations by themselves.

---

# 4. Core Engineering Concepts

The following concepts form the initial engineering knowledge set:

1. SOLID Design Principles
2. Concurrency and Parallelism
3. Immutability
4. Streaming and Messaging
5. Caching
6. Cache Stampede Protection
7. Idempotency
8. Rate Limiting
9. Scalability
10. HTTP and API Design
11. Authentication and Authorization
12. TLS
13. Security Principles
14. Database Indexes
15. Database Transactions
16. Locking and Concurrency Control
17. Design Patterns
18. Test-Driven Development
19. Exception Handling
20. HTTP Status Codes
21. Retries and Timeouts
22. Resilience and Failure Handling
23. Observability
24. Data Validation
25. Data Quality
26. Data Lineage
27. ETL and Data Processing
28. Architecture Principles
29. System Design
30. Simplicity and YAGNI
31. Consistency Strategies
32. Backpressure
33. API Contracts
34. Dependency Management

These concepts overlap and should be evaluated together when appropriate.

---

# 5. SOLID Design Principles

## Concept

SOLID is a group of design principles intended to make software easier to maintain, extend, test, and reason about.

### Single Responsibility Principle

A component should have one clear responsibility and one primary reason to change.

### Open/Closed Principle

Software should be designed so behavior can be extended without unnecessary modification of stable existing behavior.

### Liskov Substitution Principle

Implementations should remain compatible with the behavior expected from their abstractions.

### Interface Segregation Principle

Consumers should not be forced to depend on capabilities they do not use.

### Dependency Inversion Principle

High-level business logic should depend on stable abstractions rather than tightly coupling itself to infrastructure details.

## Apply When

SOLID principles are useful when:

- business logic is difficult to test
- a component has multiple unrelated responsibilities
- changing one feature repeatedly breaks unrelated features
- infrastructure details leak into business logic
- interchangeable behaviors are implemented through large conditionals
- dependencies make testing difficult

## Do Not Apply Blindly

Avoid:

- excessive abstraction
- unnecessary interfaces
- dependency injection without a real benefit
- splitting small cohesive components
- abstractions that make the system harder to understand

## Decision Questions

1. What responsibility is causing the problem?
2. What coupling actually exists?
3. What future change is expected?
4. Does the proposed abstraction reduce complexity?
5. Would the design be clearer without the abstraction?

---

# 6. Concurrency and Parallelism

## Concept

Concurrency allows multiple operations to make progress during overlapping periods.

Parallelism means multiple operations execute simultaneously using separate execution resources.

They are related but not identical.

## Apply When

Consider concurrency when:

- operations spend significant time waiting on I/O
- independent operations can overlap
- background work should not block interactive requests
- multiple jobs can safely execute independently
- throughput can be improved without violating consistency

## Risks

Concurrency introduces:

- race conditions
- deadlocks
- lost updates
- inconsistent state
- resource exhaustion
- difficult debugging

## Decision Questions

Before introducing concurrency, determine:

- Is the work CPU-bound or I/O-bound?
- Are operations independent?
- Is shared mutable state involved?
- What happens if two operations execute simultaneously?
- What synchronization or transactional guarantees are required?
- Is concurrency actually necessary?

Do not introduce concurrency merely because it appears faster.

---

# 7. Immutability

## Concept

Immutable data cannot be changed after creation.

Instead of modifying existing state, create a new representation.

Immutability can reduce accidental state changes and make concurrent systems easier to reason about.

## Useful For

- configuration
- value objects
- event payloads
- state snapshots
- facts that should not change
- shared data accessed concurrently

## Benefits

- fewer side effects
- easier testing
- safer concurrency
- clearer data flow
- easier reasoning about state

## Trade-off

Excessive copying can increase memory usage and processing cost.

---

# 8. Streaming and Messaging

## Concept

Messaging and streaming allow producers and consumers to communicate without requiring direct synchronous execution.

Possible implementations include:

- message queues
- event streams
- task queues
- managed messaging services

The implementation is secondary to the architectural problem.

## Apply When

Consider messaging when:

- processing can happen asynchronously
- producers should not wait for slow consumers
- workloads need buffering
- workloads can spike suddenly
- independent components need loose coupling
- background processing is required
- multiple consumers need to react to events

## Conceptual Example

Instead of:

```text
Request
  ↓
Parse
  ↓
Validate
  ↓
Transform
  ↓
Compute
  ↓
Save
  ↓
Response
```

consider:

```text
Request
  ↓
Validate
  ↓
Create Job
  ↓
Queue
  ↓
Worker
  ↓
Process
  ↓
Persist Result
```

## Important Trade-offs

Messaging introduces:

- eventual consistency
- duplicate delivery
- ordering concerns
- retry behavior
- dead-letter handling
- operational complexity
- observability requirements

## Decision Rule

Do not introduce a queue merely because the system is described as "scalable."

First determine whether asynchronous decoupling solves a demonstrated problem.

---

# 9. Caching

## Concept

A cache stores frequently accessed data closer to consumers so expensive operations do not need to happen repeatedly.

Possible implementations include:

- in-memory caches
- distributed caches
- HTTP caches
- CDN caches
- query caches

## Primary Goal

A cache should protect an expensive dependency when repeated reads are demonstrably costly.

## Example

```text
Many Requests
      ↓
    Cache
      ↓
 Expensive Source
```

instead of:

```text
Many Requests
      ↓
 Expensive Source
```

## Cache Invalidation

Caching introduces the question:

> When is cached data no longer valid?

Possible strategies:

- TTL expiration
- explicit invalidation
- write-through
- write-behind
- cache-aside
- versioned keys
- stale-while-revalidate

## Trade-offs

Caching can introduce:

- stale data
- invalidation complexity
- memory usage
- operational dependencies
- cache stampedes
- inconsistent reads

## Decision Rule

Before caching, evaluate:

1. Can query optimization solve the problem?
2. Can an index solve it?
3. Can unnecessary requests be removed?
4. Is the data suitable for caching?
5. What consistency guarantee is required?

---

# 10. Cache Stampede

## Concept

A cache stampede occurs when many requests simultaneously discover that the same cached value is missing or expired.

Example:

```text
Many Requests
      ↓
Cache expires
      ↓
Many cache misses
      ↓
Many expensive operations
      ↓
Dependency overload
```

## Mitigations

### Request Coalescing / Single Flight

Allow one operation to regenerate the value while other requests share the result.

### TTL Jitter

Avoid identical expiration times by adding controlled randomness.

```text
Actual TTL = Base TTL + Jitter
```

### Explicit Invalidation

Refresh or invalidate data when the source changes.

### Stale-While-Revalidate

Serve an acceptable stale value while refreshing it in the background.

## Decision Rule

High-traffic caches should explicitly consider stampede behavior.

---

# 11. Idempotency

## Concept

An operation is idempotent when repeating it produces the same intended result as performing it once.

This is especially important when operations can be retried.

## Example

```text
Request succeeds
      ↓
Response is lost
      ↓
Client retries
```

Without idempotency:

```text
Operation executed
Operation executed again
```

With an idempotency mechanism:

```text
First request → perform operation
Retry         → return existing result
```

## Apply To

- payments
- order creation
- data ingestion
- job creation
- webhook processing
- retryable background work
- external API calls

## Decision Rule

Whenever an operation can be retried, ask:

> What happens if this exact operation executes twice?

If duplicate execution is harmful, evaluate idempotency.

---

# 12. Rate Limiting

## Concept

Rate limiting controls how frequently a client or actor can perform an operation.

Examples:

```text
5 authentication attempts / minute
100 normal requests / minute
10 expensive computations / minute
```

## Algorithms

- fixed window
- sliding window
- token bucket
- leaky bucket

## Decision Rule

Rate limits should protect the actual resource being consumed.

Avoid using one arbitrary global limit for unrelated operations.

---

# 13. Scalability

## Concept

Scalability is the ability to handle increased workload while maintaining acceptable performance and reliability.

### Vertical Scaling

Increase resources available to an existing execution environment.

### Horizontal Scaling

Add additional execution instances.

## Analyze

Consider:

- CPU
- memory
- database capacity
- network throughput
- queue depth
- cache hit rate
- external service limits
- concurrency
- request latency

## Decision Rule

Do not scale horizontally before identifying the bottleneck.

Measure first.

---

# 14. HTTP and API Design

## Concept

HTTP APIs define communication contracts between clients and servers.

Important areas include:

- methods
- status codes
- headers
- authentication
- authorization
- validation
- pagination
- filtering
- sorting
- versioning
- error formats
- timeouts
- retries
- idempotency

## API Design Principle

An API should expose meaningful domain behavior rather than simply mirroring storage structures.

Prefer concepts such as:

```text
/production-records
```

over generic operations such as:

```text
/insert_row
```

## Reliability

An API should define:

- success behavior
- validation behavior
- failure behavior
- timeout behavior
- retry behavior
- idempotency requirements
- authentication requirements
- authorization requirements

---

# 15. Authentication and Authorization

Authentication answers:

> Who are you?

Authorization answers:

> What are you allowed to do?

These are different concerns.

## JWT

JWT is a token format that can represent identity and claims.

Consider:

- expiration
- signing algorithms
- key rotation
- token storage
- revocation requirements

## OAuth

OAuth is an authorization framework for delegated access.

Do not treat JWT and OAuth as interchangeable.

JWT is a token format.

OAuth is an authorization framework/protocol.

## Decision Rule

Choose an authentication/authorization mechanism based on:

- trust boundaries
- clients
- data sensitivity
- authorization model
- operational requirements
- revocation requirements

---

# 16. TLS

TLS protects communication between systems.

It provides:

- encryption
- integrity
- server authentication

Production systems should normally use HTTPS.

Consider:

- certificate management
- TLS termination
- secure cookies
- HSTS
- internal encryption where appropriate

Never transmit credentials or sensitive data over unencrypted production communication.

---

# 17. Security Principles

Security should be treated as a system property.

## Input Validation

Validate:

- type
- range
- format
- length
- allowed values
- relationships between fields

## Authentication

Verify identity before protected operations.

## Authorization

Verify permission for the requested resource or action.

## Secrets

Never hardcode:

- passwords
- API keys
- signing secrets
- database credentials

Use appropriate secret-management mechanisms.

## Injection

Use safe parameterization and appropriate query interfaces.

## Dependencies

Regularly assess dependency vulnerabilities and update responsibly.

## Logging

Do not log:

- passwords
- access tokens
- secrets
- sensitive personal information

## Security Review

For security-sensitive changes, inspect:

1. Authentication
2. Authorization
3. Validation
4. Secret handling
5. Injection risks
6. Logging
7. Error leakage
8. Dependency risks
9. Data exposure
10. Trust boundaries

---

# 18. Database Indexes

Indexes allow databases to locate rows more efficiently.

Without an appropriate index:

```text
Query
 ↓
Broad scan
```

With an appropriate index:

```text
Query
 ↓
Index
 ↓
Relevant rows
```

## Consider Indexes For

- frequent filters
- joins
- sorting
- unique constraints
- common lookup patterns

## Do Not Over-Index

Indexes consume:

- storage
- memory
- write performance

Every write may require index maintenance.

## Decision Rule

Create indexes from actual query patterns and evidence.

Analyze:

- query frequency
- selectivity
- execution plans
- table size
- read/write ratio

---

# 19. Database Transactions

## Concept

A transaction groups operations into one logical unit.

ACID properties include:

- Atomicity
- Consistency
- Isolation
- Durability

## Apply When

Multiple operations must preserve one business invariant.

Examples:

- order creation
- inventory changes
- financial operations
- multi-table writes
- job state transitions

## Decision Rule

Ask:

> Can the system enter an invalid state if only part of these operations succeeds?

If yes, evaluate a transaction.

---

# 20. Locking and Concurrency Control

Concurrent writes can cause:

- lost updates
- inconsistent state
- race conditions
- duplicate processing

Possible approaches include:

- transactions
- pessimistic locking
- optimistic concurrency
- compare-and-swap semantics
- unique constraints
- idempotency

The correct approach depends on:

- contention
- workload
- consistency requirements
- failure behavior
- transaction duration

Do not introduce locking without understanding the invariant it protects.

---

# 21. Design Patterns

Design patterns are reusable approaches to recurring design problems.

They are not requirements.

## Factory

Useful when object creation decisions are sufficiently complex or interchangeable implementations must be selected.

## Singleton

Can provide one shared instance within an intended scope.

Risks include:

- hidden global state
- testing difficulty
- lifecycle problems
- concurrency problems

Do not use it merely because one instance happens to exist today.

## Decorator

Adds behavior around another component.

Potential applications:

- logging
- caching
- authorization
- metrics
- retries
- timing

## Observer

Allows interested components to react to published changes or events.

Potential applications:

- notifications
- audit events
- secondary processing

## Decision Rule

Never introduce a pattern because it sounds sophisticated.

First identify the recurring problem and determine whether the pattern reduces complexity.

---

# 22. Test-Driven Development

TDD uses a repeated cycle:

```text
RED
 ↓
Write failing test
 ↓
GREEN
 ↓
Implement minimum behavior
 ↓
REFACTOR
 ↓
Repeat
```

## Problems It Can Prevent

- regressions
- unclear requirements
- accidental behavior changes
- difficult-to-test designs
- premature overengineering

## Useful For

- business rules
- calculations
- validation
- state transitions
- data transformations
- edge-heavy behavior

## Testing Layers

- unit tests
- integration tests
- contract/API tests
- end-to-end tests

## Decision Rule

Prioritize externally meaningful behavior and important failure cases rather than maximizing line coverage.

---

# 23. Exception Handling

Exceptions represent failures or exceptional conditions inside application code.

They should be handled at appropriate architectural boundaries.

Conceptually:

```text
Infrastructure Failure
        ↓
Infrastructure Boundary
        ↓
Application/Domain Error
        ↓
Transport Boundary
        ↓
Safe External Response
```

Do not expose raw infrastructure exceptions to clients.

## Exception Categories

### Expected Business Errors

Examples:

- resource does not exist
- operation conflicts with current state
- user lacks permission
- business rule rejects operation

### Validation Errors

Examples:

- invalid date
- invalid quantity
- unsupported value
- malformed request

### Infrastructure Errors

Examples:

- database unavailable
- cache unavailable
- external API timeout
- message broker unavailable

### Unexpected Programming Errors

Examples:

- type errors
- null/none errors
- unexpected state
- logic bugs

Unexpected failures should be safely reported to the client while detailed diagnostics remain in secure logs.

---

# 24. HTTP Status Codes

HTTP status codes are part of an API's behavioral contract.

## Common Success Codes

| Code | Meaning |
|---|---|
| 200 | Successful request with response |
| 201 | Resource created |
| 202 | Accepted for asynchronous processing |
| 204 | Successful operation without response body |

## Common Client Errors

| Code | Meaning |
|---|---|
| 400 | Malformed/general invalid request |
| 401 | Missing or invalid authentication |
| 403 | Authenticated but not permitted |
| 404 | Resource not found |
| 409 | State conflict |
| 422 | Semantic/validation failure |
| 429 | Rate limit exceeded |

## Common Server Errors

| Code | Meaning |
|---|---|
| 500 | Unexpected server failure |
| 502 | Invalid upstream response |
| 503 | Temporary service unavailability |
| 504 | Upstream timeout |

Do not use `200 OK` to represent a failed operation.

Do not return `500` for expected client errors.

---

# 25. Retry Safety

Retries can improve reliability but can also duplicate operations.

Before retrying, ask:

```text
Can the operation execute twice safely?
        ↓
       YES
        ↓
Retry may be safe
```

For non-idempotent operations, evaluate:

- idempotency keys
- deduplication
- transaction semantics
- operation state

For temporary dependency failures, consider:

- bounded retries
- exponential backoff
- jitter
- timeout limits
- circuit breaking

Do not blindly retry permanent client errors.

---

# 26. Timeouts and Failure Handling

Every external dependency should have a defined failure strategy.

Without timeouts:

```text
Dependency hangs
    ↓
Request waits
    ↓
Resources remain occupied
    ↓
System capacity decreases
```

Consider:

- connection timeout
- read timeout
- total operation timeout
- retry budget
- cancellation
- fallback
- circuit breaker

Failure handling should be designed together with idempotency and observability.

---

# 27. Observability

Observability helps determine what a system is doing internally from external outputs.

Important signals include:

- logs
- metrics
- traces

Useful operational information includes:

- request latency
- error rates
- throughput
- queue depth
- resource usage
- cache hit rate
- dependency failures
- database performance

Logs should be:

- structured where appropriate
- correlated with request/job identifiers
- safe from sensitive data leakage

Observability should help answer:

> What happened?

> Why did it happen?

> How often does it happen?

> What changed?

---

# 28. Data Validation

Validation protects system boundaries from invalid or unsafe data.

Consider:

- type
- required fields
- range
- format
- allowed values
- relationships
- business rules

Validation should occur at appropriate boundaries without assuming that client-side validation is sufficient.

Client validation improves user experience.

Server/domain validation protects correctness.

---

# 29. Data Quality

Data quality concerns whether data is suitable for its intended use.

Important dimensions include:

- accuracy
- completeness
- consistency
- timeliness
- uniqueness
- validity

Data pipelines should consider:

```text
Input
 ↓
Validation
 ↓
Quality checks
 ↓
Transformation
 ↓
Storage
 ↓
Verification
```

Do not assume imported data is correct simply because it came from a trusted source.

---

# 30. ETL and Data Processing

ETL generally means:

```text
Extract
 ↓
Transform
 ↓
Load
```

Data processing may also use other architectures such as ELT.

Choose based on:

- data volume
- transformation requirements
- source characteristics
- destination capabilities
- latency requirements
- reproducibility
- auditability

Important concerns include:

- validation
- deduplication
- idempotency
- schema changes
- error handling
- lineage
- recovery

---

# 31. Data Lineage

Data lineage describes where data came from and how it was transformed.

A useful lineage model:

```text
Source
 ↓
Extraction
 ↓
Transformation
 ↓
Validation
 ↓
Storage
 ↓
Derived Dataset
 ↓
Application Result
```

Lineage helps with:

- debugging
- auditing
- reproducibility
- data quality
- compliance
- understanding derived results

---

# 32. Architecture Principles

Good architecture should optimize for:

- clarity
- maintainability
- reliability
- testability
- appropriate scalability
- security
- understandable ownership boundaries

Avoid architecture that exists primarily to look sophisticated.

Architecture should emerge from actual constraints.

---

# 33. System Design Thinking

Think in terms of problems and constraints.

Instead of:

> We need a distributed cache.

Ask:

> What problem is causing enough cost or latency to justify a cache?

Instead of:

> We need a task queue.

Ask:

> Do we have work that should be asynchronous or independently retried?

Instead of:

> We need an event stream.

Ask:

> Do we require durable, replayable, high-throughput event processing?

Instead of:

> We need microservices.

Ask:

> What scaling, ownership, deployment, or isolation problem requires service boundaries?

Technology selection should happen **after** the problem has been established.

---

# 34. Concept Relationship Thinking

Many failures happen because concepts are considered independently.

## Caching

Consider:

```text
Caching
+ invalidation
+ TTL
+ stampede protection
+ stale data
+ dependency failure
```

## Messaging

Consider:

```text
Messaging
+ retries
+ idempotency
+ ordering
+ duplicate delivery
+ dead-letter handling
+ backpressure
```

## Concurrency

Consider:

```text
Concurrency
+ shared state
+ race conditions
+ transactions
+ locking
+ idempotency
```

## APIs

Consider:

```text
API
+ authentication
+ authorization
+ validation
+ status codes
+ rate limiting
+ retries
+ idempotency
```

## Database Writes

Consider:

```text
Database writes
+ transactions
+ constraints
+ concurrency
+ locking
+ retries
```

## Distributed Systems

Consider:

```text
Distributed system
+ partial failure
+ timeouts
+ retries
+ duplicate operations
+ consistency
+ observability
```

The goal is to recognize **system interactions**, not memorize isolated definitions.

---

# 35. Technology and Tool Neutrality

This knowledge base may be used by:

- AI coding agents
- IDE assistants
- CLI coding tools
- code review assistants
- repository analysis tools
- automated development workflows
- human developers

The knowledge must not assume:

- a specific AI provider
- a specific agent framework
- a specific IDE
- a specific CLI
- a specific operating system
- a specific programming language
- a specific framework
- a specific database
- a specific cloud provider

Tool-specific behavior belongs in the tool's own configuration.

Engineering knowledge belongs here.

## Example

A tool may say:

> "Load the relevant engineering document before proposing an architectural change."

That is a **tool instruction**.

The knowledge base should instead say:

> "Before proposing an architectural change, understand the current architecture, identify the problem, evaluate alternatives, and consider trade-offs."

This allows any tool to apply the same reasoning.

---

# 36. What an Engineering Assistant Should Produce When Recommending a Concept

When recommending a concept, explain:

### Problem

What actual problem was observed?

### Concept

What engineering concept addresses it?

### Why

Why does the concept fit this scenario?

### Alternatives

What simpler alternatives were considered?

### Trade-offs

What complexity or failure modes does it introduce?

### Scope

Where should it be applied?

### Non-Scope

Where should it not be applied?

### Verification

How can we determine whether it actually helped?

Example:

```text
Problem:
Repeated expensive reads are causing high latency.

Concept:
Caching.

Why:
The data is read frequently and changes relatively infrequently.

Alternative:
Optimize the query and add an appropriate index first.

Trade-offs:
Caching introduces stale-data and invalidation concerns.

Scope:
Cache the specific high-frequency read.

Non-Scope:
Do not cache rapidly changing transactional data without a clear consistency strategy.

Verification:
Measure cache hit rate, latency, dependency load, and correctness.
```

This is the preferred reasoning format.

---

# 37. Recommended Knowledge Directory

The knowledge source can be split into focused documents as it grows.

```text
knowledge/
├── INDEX.md
│
├── fundamentals/
│   ├── solid.md
│   ├── immutability.md
│   ├── concurrency.md
│   └── design-patterns.md
│
├── api/
│   ├── http.md
│   ├── status-codes.md
│   ├── exception-handling.md
│   ├── authentication.md
│   ├── authorization.md
│   └── rate-limiting.md
│
├── database/
│   ├── indexes.md
│   ├── transactions.md
│   ├── locking.md
│   └── query-optimization.md
│
├── distributed/
│   ├── messaging.md
│   ├── idempotency.md
│   ├── retries.md
│   ├── timeouts.md
│   ├── consistency.md
│   └── backpressure.md
│
├── performance/
│   ├── caching.md
│   ├── scalability.md
│   └── performance.md
│
├── security/
│   ├── security-principles.md
│   ├── authentication.md
│   └── authorization.md
│
├── testing/
│   ├── tdd.md
│   └── testing-strategy.md
│
├── architecture/
│   ├── architecture-principles.md
│   ├── failure-analysis.md
│   ├── trade-offs.md
│   └── simplicity.md
│
└── data/
    ├── validation.md
    ├── data-quality.md
    ├── etl.md
    └── data-lineage.md
```

This is a template, not a requirement that every project contain every document.

Create a knowledge document only when the project benefits from the concept.

---

# 38. Recommended Knowledge Index

The index should be small enough to load cheaply.

```markdown
# Engineering Knowledge Index

This directory contains general, technology-neutral engineering concepts.

Do not load the entire directory by default.

## How to Use

1. Identify the problem.
2. Identify relevant concepts.
3. Open only the relevant knowledge document(s).
4. Compare alternatives.
5. Consider trade-offs.
6. Apply only the simplest sufficient solution.
7. Verify the result.

## Concept Map

### Performance

- Repeated expensive reads → caching, indexes, query optimization
- High latency → profiling, optimization, caching, concurrency
- High workload → scalability, rate limiting, backpressure

### Reliability

- Duplicate operations → idempotency
- Temporary failures → timeout, retry, exponential backoff
- Repeated dependency failures → circuit breaker
- Dependency unavailable → fallback, graceful degradation

### Database

- Slow queries → indexes, query optimization
- Concurrent writes → transactions, locking, concurrency control
- Partial updates → transactions
- Duplicate data → constraints, idempotency

### API

- Invalid input → validation
- Missing authentication → 401
- Insufficient permission → 403
- Missing resource → 404
- State conflict → 409
- Validation failure → 422
- Excessive requests → 429
- Unexpected server failure → 500

### Architecture

- High coupling → separation of concerns, dependency inversion
- Repeated construction logic → factory
- Cross-cutting behavior → decorator
- Event reactions → observer
- Excessive complexity → simplicity, YAGNI

### Distributed Systems

- Asynchronous work → messaging
- Duplicate messages → idempotency
- Uneven workload → backpressure
- Partial failure → timeout, retry, circuit breaker
- Data consistency problems → consistency strategy, transactions

### Operations

- Difficult debugging → observability
- Missing system visibility → logs, metrics, tracing
- Unclear failures → structured errors and monitoring
```

The index should direct an assistant toward the appropriate concept without requiring the entire knowledge base to be loaded.

---

# 39. Recommended Knowledge Document Template

Every individual concept document should follow a consistent structure:

```markdown
# Concept Name

## Definition

What is the concept?

## Problem

What problem does it address?

## Applicable Scenarios

When is this concept useful?

## Problems It Can Prevent

What failures, costs, or risks can it reduce?

## How It Works Conceptually

Explain the mechanism without tying it to a particular programming language, framework, or tool.

## Alternatives

What other concepts or simpler approaches could solve the same problem?

## Trade-offs

What complexity, cost, or new failure modes does it introduce?

## When Not to Use

When is this concept unnecessary or harmful?

## Related Concepts

What other concepts should be considered together with it?

## Decision Questions

What questions should an engineer ask before applying it?

## Verification

How can the engineer determine whether applying it actually helped?

## Example Scenario

Provide a technology-neutral example.
```

This keeps documents focused and makes selective retrieval more useful.

---

# 40. Token-Efficiency Principle

The knowledge base should be:

**Large in storage, selective in context.**

Desired architecture:

```text
                Large knowledge library
                         │
                         ↓
                  Small index
                         │
                         ↓
                  Identify problem
                         │
                         ↓
              Select relevant concepts
                         │
                         ↓
              Load only those concepts
                         │
                         ↓
                   Solve problem
```

Avoid:

```text
Every task
    ↓
Load every concept
    ↓
Large context
    ↓
Higher token usage
    ↓
More irrelevant information
    ↓
Higher risk of overengineering
```

The objective is:

> **Large knowledge base + small always-loaded instructions + selective concept retrieval.**

This principle applies regardless of which AI tool, coding agent, IDE, CLI, or workflow consumes the knowledge.

---

# 41. Final Principle

The objective is not to build a system using every concept in this document.

The objective is to recognize **when a concept changes the outcome**.

A good engineering assistant asks:

> What problem exists?

Then:

> What context and constraints exist?

Then:

> What evidence do we have?

Then:

> Which concepts could address the problem?

Then:

> What is the simplest reliable solution?

And finally:

> What are the consequences if this solution fails?

The knowledge base is a **reasoning framework**, not a technology checklist.

It should improve engineering decisions regardless of which tool is being used.
