# Scope of This Knowledge Base

This knowledge base is intentionally **technology- and programming-language-neutral**.

Its purpose is to teach an engineering agent:

- what a concept means
- what problem it solves
- what scenarios it applies to
- what problems it can prevent
- when it may be unnecessary
- what trade-offs and failure modes it introduces
- how it relates to other system-design concepts

It should **not** prescribe a programming language, framework, database, cloud provider, or implementation library.

Specific technologies may be mentioned only as examples of an implementation approach. The concept remains the primary subject.

The agent should reason from:

**Problem → Context → Constraints → Concept → Trade-offs → Appropriate application**

rather than:

**Technology → Find a reason to use it**

---

# How This Knowledge Should Be Used by Kiro

This is a **general engineering knowledge library**, not a mandatory instruction set.

Kiro should **not load the entire knowledge base for every task**.

Loading all engineering concepts into every task can increase context/token usage and can encourage unnecessary overengineering. The knowledge should therefore be treated as **on-demand reference material**.

## Context Hierarchy

Kiro should conceptually separate its information into these layers:

### Layer 1 — Always-Loaded Instructions

These should remain small:

```text
AGENTS.md
rules.md
workflow.md
```

They define:

- how Kiro should behave
- project rules and constraints
- how Kiro should perform work

Do not place the entire engineering knowledge base in these files.

### Layer 2 — Project Context

Project-specific information:

```text
context/
├── backend.md
├── frontend.md
├── database.md
└── testing.md
```

This answers:

> "What is this particular project?"

Load only the context relevant to the current task.

### Layer 3 — Engineering Knowledge

General concepts:

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

This answers:

> "What engineering concept may help solve this problem?"

Load only the relevant concept or small group of concepts.

---

# Engineering Knowledge Index

A small index should be preferred as the entry point rather than loading every knowledge document.

Example:

```text
Performance problem
    ↓
Identify bottleneck
    ↓
Possible concepts:
    → query optimization
    → database indexes
    → caching
    → concurrency
    → scalability
```

```text
Duplicate operation
    ↓
Consider:
    → idempotency
    → database constraints
    → transactions
```

```text
Dependency failure
    ↓
Consider:
    → timeout
    → retry
    → exponential backoff
    → circuit breaker
    → fallback
```

```text
Concurrent update
    ↓
Consider:
    → transactions
    → locking
    → optimistic concurrency
    → idempotency
```

```text
API failure
    ↓
Consider:
    → validation
    → authentication
    → authorization
    → HTTP status codes
    → error handling
```

The index should remain concise. Detailed explanations belong in the individual knowledge documents.

---

# Important Loading Rule

Kiro should **not** reason:

> "Redis is in the knowledge base, therefore Redis should be used."

Kiro should reason:

> "There is a repeated expensive read problem. Which concepts could address it? Is query optimization sufficient? Would an index solve it? Would caching be justified? What are the trade-offs?"

The knowledge base exists to improve **problem-solving**, not to increase the number of technologies used.

---

# Preventing Knowledge-Induced Overengineering

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

---

# 1. Core Engineering Concepts

The following concepts should be treated as foundational system-design knowledge:

1. SOLID Design Principles
2. Multithreading & Concurrency
3. Immutability
4. Streaming & Messaging
5. Caching
6. Idempotency
7. Security Best Practices
8. SSL/TLS, JWT & OAuth
9. Design Patterns
10. Test-Driven Development
11. Rate Limiting
12. Scalability
13. HTTP & API Design
14. Database Indexes
15. Database Transactions
16. PostgREST

These concepts overlap. They should therefore be evaluated together rather than treated as isolated techniques.

---

# 2. SOLID Design Principles

## Concept

SOLID is a group of object-oriented design principles intended to make software easier to maintain, extend, test, and reason about.

### S — Single Responsibility Principle

A module, class, or component should have one clear responsibility and one primary reason to change.

### O — Open/Closed Principle

Software entities should be open for extension but closed for unnecessary modification.

### L — Liskov Substitution Principle

Implementations should remain compatible with the behavior expected from their abstractions.

### I — Interface Segregation Principle

Consumers should not be forced to depend on interfaces or capabilities they do not use.

### D — Dependency Inversion Principle

High-level business logic should depend on abstractions rather than tightly coupling itself to infrastructure details.

## Apply

Apply SOLID when:

- business logic is becoming difficult to test
- a module has multiple unrelated responsibilities
- changing one feature repeatedly breaks unrelated features
- infrastructure details are leaking into business logic
- code contains large conditional branches for interchangeable behaviors
- dependencies make unit testing difficult

## Do Not Apply Blindly

Do not split every small class or function merely to satisfy SOLID.

Avoid:

- excessive abstraction
- interfaces with only one trivial implementation
- unnecessary dependency injection
- fragmented code that is harder to understand

## Kiro Decision Rule

Before refactoring toward SOLID, identify:

1. The current responsibility.
2. The actual source of coupling.
3. The expected future change.
4. Whether the abstraction reduces complexity.

---

# 3. Multithreading & Concurrency

## Concept

Concurrency allows multiple operations to make progress during overlapping periods.

Concurrency is different from parallelism:

- **Concurrency:** multiple tasks are in progress.
- **Parallelism:** multiple tasks execute simultaneously on different execution resources.

In Python, concurrency may involve:

- async/await
- asyncio
- threads
- processes
- task queues such as Celery
- external workers

## Apply

Use concurrency when:

- operations spend significant time waiting on I/O
- multiple independent external API calls can execute concurrently
- background work should not block HTTP requests
- multiple jobs can safely execute independently
- throughput can be improved without violating data consistency

## Risks

Concurrency introduces:

- race conditions
- deadlocks
- lost updates
- inconsistent state
- resource exhaustion
- difficult debugging

## Kiro Decision Rule

Before introducing concurrency, determine:

- Is the task CPU-bound or I/O-bound?
- Are operations independent?
- Is shared mutable state involved?
- What happens if two operations execute simultaneously?
- What synchronization or transactional guarantees are required?

Do not introduce multithreading simply because it appears faster.

---

# 4. Immutability

## Concept

Immutable data cannot be changed after creation.

Instead of modifying an existing object, create a new representation.

Immutability reduces accidental state changes and makes concurrent systems easier to reason about.

## Apply

Useful for:

- configuration objects
- request/response models
- value objects
- event payloads
- state snapshots
- shared data used by concurrent operations

## Benefits

- fewer side effects
- easier testing
- safer concurrency
- easier reasoning about state
- clearer data flow

## Trade-off

Excessive copying can increase memory usage and processing cost.

## Kiro Decision Rule

Prefer immutable data for values that represent facts, configuration, events, or snapshots.

Mutable state is appropriate when controlled mutation is part of the domain model.

---

# 5. Streaming & Messaging

## Concept

Streaming and message queues decouple producers from consumers.

Examples include:

- Apache Kafka
- RabbitMQ
- Redis Streams
- cloud message queues

A producer creates work or events while consumers process them independently.

## Apply

Use messaging when:

- processing can happen asynchronously
- producers should not wait for slow consumers
- workloads need buffering
- independent services need loose coupling
- workloads can spike suddenly
- background processing is required
- events need to be processed by multiple consumers

### Example

An API receives a large data ingestion request.

Instead of:

```text
HTTP Request
    ↓
Parse data
    ↓
Validate data
    ↓
Transform data
    ↓
Run computations
    ↓
Save results
    ↓
HTTP Response
```

A queue-based architecture can use:

```text
HTTP Request
    ↓
Validate + Create Job
    ↓
Queue
    ↓
Worker
    ↓
Process Data
    ↓
Persist Results
```

## Kafka vs RabbitMQ

### Kafka

Prefer when the system needs:

- high-throughput event streaming
- durable event history
- replayable events
- multiple independent consumers
- event-driven architectures

### RabbitMQ

Prefer when the system primarily needs:

- task distribution
- work queues
- routing
- acknowledgements
- traditional asynchronous jobs

## Kiro Decision Rule

Do not add Kafka/RabbitMQ merely because a system is "scalable."

First determine whether asynchronous decoupling actually solves a problem.

---

# 6. Caching

## Concept

A cache stores frequently accessed data closer to the application so expensive operations do not need to happen repeatedly.

Possible cache implementations include:

- in-memory caches
- distributed caches
- HTTP caches
- CDN caches
- database/query caches

The implementation technology is secondary to the caching strategy.

## Primary Goal

A cache should **shield expensive dependencies**, especially databases and external APIs.

Example:

```text
100,000 Requests
       ↓
     Cache
       ↓
   Database
```

instead of:

```text
100,000 Requests
       ↓
   Database
```

## Cache Invalidation

Caching introduces a fundamental problem:

> How do we know when cached data is no longer valid?

Possible strategies:

- TTL expiration
- explicit invalidation
- write-through
- write-behind
- cache-aside
- versioned keys

---

# 7. Cache Stampede / Thundering Herd

## Concept

A cache stampede occurs when many requests simultaneously discover that the same cached value has expired.

Example:

```text
Cache key: crop:tomato:price

100,000 requests
       ↓
Key expires
       ↓
100,000 cache misses
       ↓
100,000 database queries
       ↓
Database overload
```

The cache was intended to protect the database but instead caused a synchronized database attack.

## Three Important Mitigations

### 1. Cache Invalidation

Invalidate or refresh values intentionally when underlying data changes.

Use this when data changes are known and controlled.

### 2. Single Flight

Only one request is allowed to regenerate a missing value.

Other requests wait for the same result.

Conceptually:

```text
Request A ──┐
Request B ──┤
Request C ──┼──> Single Flight ──> Database
Request D ──┤
Request E ──┘

              ↓

        Shared result
```

This prevents N simultaneous cache misses from becoming N database queries.

### 3. TTL Jitter

Do not give every cache entry the exact same expiration time.

Instead:

```text
TTL = Base TTL + Random Jitter
```

Example:

```text
Base TTL = 3600 seconds
Jitter = random(0, 300)

Actual TTL = 3600–3900 seconds
```

This prevents large groups of keys from expiring simultaneously.

## Kiro Decision Rule

For high-traffic caches, consider:

- cache-aside behavior
- expiration strategy
- stampede protection
- single-flight/request coalescing
- TTL jitter
- stale-while-revalidate
- fallback behavior when Redis is unavailable

---

# 8. Idempotency

## Concept

An operation is idempotent when repeating it produces the same intended result as performing it once.

This is especially important in distributed systems because requests can be retried.

## Example

A client sends:

```text
POST /payments
```

The request succeeds, but the response is lost.

The client retries.

Without idempotency:

```text
Payment created
Payment created again
```

With an idempotency key:

```text
Idempotency-Key: abc123

First request  → create payment
Retry          → return existing result
```

## Apply

Use idempotency for:

- payment operations
- order creation
- data ingestion
- job creation
- external API calls
- webhook processing
- retryable background tasks

## Kiro Decision Rule

Whenever a system can retry an operation, ask:

> "What happens if this exact operation executes twice?"

If duplicate execution is harmful, introduce idempotency.

---

# 9. Rate Limiting

## Concept

Rate limiting controls how frequently a client can perform an operation.

Example:

```text
100 requests / minute / user
```

## Apply

Use rate limiting to protect:

- APIs
- authentication endpoints
- expensive computations
- external APIs
- database-backed endpoints
- resource-intensive operations

## Common Algorithms

- Fixed window
- Sliding window
- Token bucket
- Leaky bucket

## Kiro Decision Rule

Rate limits should be based on the resource being protected.

For example:

```text
Login:
5 attempts/minute

Normal API:
100 requests/minute

Expensive forecast:
10 requests/minute
```

Do not use one arbitrary global limit for every endpoint.

---

# 10. Scalability

## Concept

Scalability is the ability of a system to handle increased workload while maintaining acceptable performance and reliability.

### Vertical Scaling

Increase resources on one machine.

```text
2 CPU → 8 CPU
8 GB RAM → 32 GB RAM
```

### Horizontal Scaling

Add more instances.

```text
Load Balancer
    ↓
API  API  API
```

## Apply

Analyze:

- CPU bottlenecks
- memory usage
- database capacity
- network throughput
- queue depth
- cache hit rate
- external API limits
- concurrency
- request latency

## Kiro Decision Rule

Do not scale horizontally before identifying the bottleneck.

Measure first.

---

# 11. HTTP & API Design

## Concept

HTTP APIs define communication contracts between clients and servers.

Important concepts include:

- HTTP methods
- status codes
- headers
- authentication
- validation
- pagination
- filtering
- sorting
- versioning
- error formats
- timeouts
- retries

## REST Principles

Use HTTP semantics appropriately:

```text
GET    /commodities
POST   /commodities
GET    /commodities/{id}
PATCH  /commodities/{id}
DELETE /commodities/{id}
```

## API Design Rule

An API should expose meaningful domain operations rather than simply mirroring database tables.

Bad:

```text
POST /insert_row
```

Better:

```text
POST /production-records
```

## Reliability

APIs should define:

- validation behavior
- timeout behavior
- retry behavior
- idempotency requirements
- error responses
- authentication requirements

---

# 12. Authentication & Authorization

## Concept

Authentication answers:

> Who are you?

Authorization answers:

> What are you allowed to do?

These are different concerns.

## JWT

JSON Web Tokens can represent authenticated identity and claims.

Useful for stateless authentication architectures.

Consider:

- token expiration
- refresh tokens
- signing algorithms
- key rotation
- token storage
- revocation requirements

## OAuth

OAuth is an authorization framework commonly used for delegated access.

Do not treat OAuth and JWT as interchangeable concepts.

JWT is a token format.

OAuth is an authorization protocol/framework.

## Apply

Use authentication/authorization when:

- users have accounts
- data belongs to different users or organizations
- administrative operations exist
- sensitive endpoints exist
- services need controlled access

---

# 13. SSL/TLS

## Concept

TLS protects communication between systems.

It provides:

- encryption
- integrity
- server authentication

Production APIs should normally use HTTPS.

## Kiro Decision Rule

Never transmit credentials, authentication tokens, or sensitive application data over unencrypted HTTP in production.

Also consider:

- certificate management
- TLS termination
- secure cookies
- HSTS
- internal service encryption where appropriate

---

# 14. Security Best Practices

Security should be treated as a system property rather than a single feature.

## Important Areas

### Input Validation

Never trust client input.

Validate:

- type
- range
- format
- length
- allowed values

### Authentication

Verify identity before protected operations.

### Authorization

Verify permission for the requested resource.

### Secrets

Never hardcode:

- passwords
- API keys
- JWT secrets
- database credentials

Use environment variables or a proper secret-management system.

### SQL Injection

Use parameterized queries and ORM/query-builder mechanisms correctly.

### Dependency Security

Regularly audit dependencies.

### Logging

Do not log:

- passwords
- access tokens
- secrets
- sensitive personal information

## Kiro Decision Rule

When modifying a security-sensitive component, explicitly inspect:

1. Authentication
2. Authorization
3. Input validation
4. Secret handling
5. Injection risks
6. Logging
7. Error leakage
8. Dependency vulnerabilities

---

# 15. Database Indexes

## Concept

Indexes allow databases to locate rows more efficiently.

Without an appropriate index:

```text
Query
 ↓
Scan entire table
```

With an appropriate index:

```text
Query
 ↓
Index
 ↓
Relevant rows
```

## Apply

Consider indexes for columns frequently used in:

- WHERE
- JOIN
- ORDER BY
- UNIQUE constraints
- common lookup patterns

## Do Not Over-Index

Indexes consume:

- storage
- memory
- write performance

Every INSERT/UPDATE/DELETE may need index maintenance.

## Kiro Decision Rule

Create indexes based on actual query patterns, not on every column.

Analyze:

- query frequency
- selectivity
- execution plans
- table size
- write/read ratio

---

# 16. Database Transactions

## Concept

A transaction groups operations into one logical unit.

The classic ACID properties are:

### Atomicity

All operations succeed or all fail.

### Consistency

The database remains valid according to its constraints.

### Isolation

Concurrent transactions should not improperly interfere with one another.

### Durability

Committed data persists.

## Example

Transferring money:

```text
BEGIN

subtract from Account A
add to Account B

COMMIT
```

If the second operation fails:

```text
ROLLBACK
```

## Apply

Use transactions when multiple database changes must maintain one business invariant.

Examples:

- order creation
- inventory updates
- financial operations
- multi-table writes
- job state transitions

## Kiro Decision Rule

Ask:

> "Can the system enter an invalid state if only half of these operations succeed?"

If yes, evaluate a transaction.

---

# 17. Design Patterns

Design patterns are reusable approaches to recurring design problems.

They are not requirements and should not be treated as a checklist.

## Factory

Separates object creation decisions from the code that uses the created object.

### Problems It Can Prevent

- repeated complex construction logic
- excessive conditional creation logic
- tightly coupled creation and usage

### Apply When

Different implementations or configurations may need to be selected at runtime or creation has meaningful complexity.

---

## Singleton

Ensures that a resource or component has one shared instance within an intended scope.

### Problems It Can Prevent

- multiple competing instances of a resource that must be shared

### Risks

- hidden global state
- difficult testing
- lifecycle problems
- concurrency problems

Do not use it merely because only one instance happens to exist today.

---

## Decorator

Adds behavior around another component without changing its core behavior.

### Problems It Can Prevent

- duplicated cross-cutting logic
- invasive modifications to existing behavior

### Possible Applications

- logging
- caching
- authorization
- metrics
- retries
- timing

---

## Observer

Allows interested components to react when another component publishes a change or event.

### Problems It Can Prevent

- tightly coupled notification logic
- large chains of direct dependencies

### Possible Applications

- notifications
- event reactions
- audit events
- secondary processing

## Kiro Decision Rule

Never introduce a pattern because it sounds architecturally sophisticated.

First identify the recurring problem, then determine whether the pattern reduces complexity rather than increasing it.

---

# 18. Test-Driven Development

## Concept

Test-Driven Development develops behavior through a repeated cycle:

```text
RED
 ↓
Write a failing test
 ↓
GREEN
 ↓
Implement the minimum behavior
 ↓
REFACTOR
 ↓
Improve the design
 ↓
Repeat
```

## Problems It Can Prevent

- regressions
- unclear requirements
- accidental behavior changes
- difficult-to-test designs
- overengineering before behavior is understood

## Apply

TDD is especially useful for:

- business rules
- calculations
- validation
- state transitions
- data transformations
- components with many edge cases

## Testing Layers

- **Unit tests** — isolated behavior
- **Integration tests** — interactions between components
- **Contract/API tests** — communication contracts
- **End-to-end tests** — complete workflows

## Kiro Decision Rule

Prioritize tests around externally meaningful behavior and important failure cases rather than maximizing line coverage.

---

# 19. PostgREST

## Concept

PostgREST exposes a PostgreSQL database through a RESTful API.

Conceptually:

```text
Client
  ↓
HTTP
  ↓
PostgREST
  ↓
PostgreSQL
```

It can reduce the amount of custom CRUD API code required for database-backed applications.

## Apply

PostgREST can be useful when:

- PostgreSQL is the primary application data source
- CRUD operations dominate
- database permissions can express access rules
- rapid API exposure is valuable
- a thin data API is appropriate

## Do Not Automatically Apply

Avoid using PostgREST simply because it is faster to set up.

A custom Application API layer may be preferable when the system requires:

- complex business logic
- orchestration across services
- complex validation
- custom workflows
- domain-specific authorization
- external API integrations
- background jobs
- specialized response transformations

## Important Architectural Question

Do not ask:

> "Can PostgREST replace my backend?"

Ask:

> "Which parts of this system are naturally represented by database-backed CRUD, and which parts require application/domain logic?"

PostgREST and Application API can also coexist.

Example:

```text
Frontend
   │
   ├──→ Application API → Business Logic
   │                 ↓
   │              PostgreSQL
   │
   └──→ PostgREST → PostgreSQL
          │
          └── Simple data access
```

Only use this architecture when the security and ownership boundaries are clearly defined.

---

# 20. How These Concepts Work Together

The concepts become significantly more useful when combined.

Example: A high-traffic agricultural forecasting API.

```text
                    ┌───────────────┐
                    │    Client     │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │ Rate Limiter  │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │ Authentication│
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │    Application API    │
                    └───────┬───────┘
                            ↓
                     ┌────────────┐
                     │   Redis    │
                     │   Cache    │
                     └─────┬──────┘
                           ↓
                    Cache Miss
                           ↓
                   Single Flight
                           ↓
                    ┌────────────┐
                    │ PostgreSQL │
                    │  + Indexes │
                    └────────────┘
```

For expensive asynchronous computation:

```text
Application API
   ↓
Create Idempotent Job
   ↓
Message Queue
   ↓
Worker
   ↓
Computation
   ↓
Database Transaction
   ↓
Persist Result
```

This combines:

- API design
- authentication
- rate limiting
- caching
- concurrency
- idempotency
- messaging
- transactions
- database indexes
- scalability

---

# 21. System Design Thinking

Kiro should think in terms of **problems and constraints**, not technologies.

Instead of:

> "We need Redis."

Ask:

> "What problem are we solving?"

Possible answer:

> Database queries are repeated frequently and latency is too high.

Then evaluate:

```text
Can query optimization solve it?
Can an index solve it?
Can reducing unnecessary requests solve it?
Can application-level caching solve it?
Would Redis provide enough benefit to justify operational complexity?
```

Likewise:

Instead of:

> "We need Celery."

Ask:

> "Do we have long-running work that should not block an HTTP request?"

Instead of:

> "We need Kafka."

Ask:

> "Do we need durable, replayable, high-throughput event streams?"

Instead of:

> "We need microservices."

Ask:

> "What actual scaling, ownership, deployment, or isolation problem requires service boundaries?"

---

# 22. Decision Framework for Kiro

Before introducing a technology, pattern, or architecture, Kiro should evaluate:

## Step 1 — Identify the Problem

What concrete problem exists?

## Step 2 — Measure or Inspect

Look for:

- performance bottlenecks
- coupling
- database query patterns
- error rates
- latency
- resource consumption
- concurrency issues
- security weaknesses

## Step 3 — Identify the Simplest Solution

Ask whether the problem can be solved with:

- better code
- a database constraint
- an index
- query optimization
- validation
- a simpler architecture

## Step 4 — Evaluate the Concept

Only then consider:

- caching
- queues
- concurrency
- patterns
- scaling
- additional infrastructure

## Step 5 — Evaluate Trade-offs

For every proposed solution identify:

- complexity
- operational cost
- failure modes
- maintenance burden
- testing requirements
- debugging difficulty
- consistency implications

## Step 6 — Implement Incrementally

Prefer the smallest change that solves the identified problem.

## Step 7 — Verify

Use:

- tests
- benchmarks
- logs
- metrics
- database query plans
- load testing where appropriate

---

# 23. Anti-Pattern: Technology-First Development

Avoid this reasoning:

```text
Redis is popular
→ Add Redis
```

```text
Kafka is scalable
→ Add Kafka
```

```text
Microservices are modern
→ Split everything
```

```text
Design patterns are good
→ Add Factory/Singleton everywhere
```

Instead:

```text
Problem
  ↓
Constraints
  ↓
Possible solutions
  ↓
Trade-off analysis
  ↓
Choose simplest sufficient solution
  ↓
Measure result
```

---

# 24. Kiro Agent Application Rules

When analyzing or modifying a codebase, Kiro should:

### Rule 1

Understand the existing architecture before proposing architectural changes.

### Rule 2

Do not introduce infrastructure without identifying the problem it solves.

### Rule 3

Prefer simple solutions before distributed solutions.

### Rule 4

Treat data consistency and failure behavior as first-class concerns.

### Rule 5

For retryable operations, evaluate idempotency.

### Rule 6

For concurrent operations, evaluate race conditions and shared state.

### Rule 7

For cached data, evaluate invalidation and cache stampede behavior.

### Rule 8

For database performance, inspect query patterns and indexes before adding caching.

### Rule 9

For asynchronous processing, evaluate whether a queue is actually required.

### Rule 10

For security-sensitive changes, explicitly review authentication, authorization, validation, secrets, and information leakage.

### Rule 11

Do not use design patterns merely for abstraction.

### Rule 12

Do not optimize based on assumptions. Prefer measurements and evidence.

### Rule 13

Keep business logic independent from infrastructure where practical.

### Rule 14

Use transactions when multiple operations must preserve one business invariant.

### Rule 15

Design APIs around domain behavior and stable contracts.

---

# 25. Quick Concept-to-Problem Map

| Problem | Concepts to Evaluate |
|---|---|
| Repeated expensive reads | Caching, indexes, query optimization |
| Cache stampede | Single Flight, TTL jitter, invalidation |
| Duplicate requests | Idempotency |
| Too many requests | Rate limiting |
| Slow external API | Async/concurrency, caching, queues |
| Long-running computation | Background workers, messaging |
| Database contention | Transactions, indexes, concurrency |
| Complex business logic | SOLID, separation of concerns |
| Repeated object creation logic | Factory |
| Cross-cutting behavior | Decorator |
| Event notifications | Observer / messaging |
| High API traffic | Rate limiting, caching, horizontal scaling |
| Authentication | JWT/OAuth, TLS |
| Unauthorized access | Authorization |
| CRUD-heavy PostgreSQL API | PostgREST |
| Difficult-to-test code | SOLID, dependency inversion, TDD |
| Race conditions | Concurrency controls, transactions, immutability |
| Unreliable retries | Idempotency |
| Large event workloads | Kafka / streaming |
| Background task distribution | RabbitMQ / task queue |

---

# 26. Final Principle

The objective is not to build the system using every concept in this document.

The objective is to recognize **when a concept changes the outcome**.

A good engineer asks:

> What problem exists?

Then:

> What constraints exist?

Then:

> Which concept provides the simplest reliable solution?

And finally:

> What are the consequences if this solution fails?

Kiro should use this knowledge as a **reasoning framework**, not as a checklist requiring every system to use every technology.


# 27. HTTP Status Codes & Exception Handling

## Concept

HTTP status codes communicate the outcome of an HTTP request.

They are part of the API contract and should be used consistently.

Kiro should distinguish between:

- successful responses
- client errors
- authentication/authorization failures
- missing resources
- validation failures
- conflicts
- rate limiting
- server failures
- upstream/dependency failures

Do not use `200 OK` for every response merely because the server successfully generated a response.

---

## 27.1 Success Codes — 2xx

### 200 OK

The request succeeded.

Common uses:

```text
GET /commodities
GET /commodities/123
PATCH /commodities/123
```

Use when the requested operation completed successfully and a response body is returned.

### 201 Created

A new resource was successfully created.

Example:

```text
POST /commodities
→ 201 Created
```

Use when the request creates a new resource.

### 202 Accepted

The request was accepted for processing, but the operation has not completed yet.

This is especially useful for asynchronous jobs.

Example:

```text
POST /forecast
→ 202 Accepted
{
    "job_id": "abc123",
    "status": "queued"
}
```

Use this when work is delegated to a background worker or queue.

### 204 No Content

The operation succeeded and there is intentionally no response body.

Common use:

```text
DELETE /commodities/123
→ 204 No Content
```

---

# 27.2 Client Error Codes — 4xx

A 4xx response generally means the client request cannot be successfully fulfilled as submitted.

## 400 Bad Request

The request is malformed or violates a general request requirement.

Examples:

- malformed request structure
- invalid query syntax
- invalid parameter combination
- malformed JSON when not handled by automatic validation

Do not use `400` for every possible client error.

---

## 401 Unauthorized

The client has not successfully authenticated.

Examples:

- missing authentication token
- invalid token
- expired token
- invalid credentials

Important distinction:

> `401` means authentication is missing or invalid.

It does **not** primarily mean "the user is logged in but lacks permission."

---

## 403 Forbidden

The client is authenticated, but does not have permission to perform the operation.

Example:

```text
Authenticated user
        ↓
POST /admin/users
        ↓
No admin permission
        ↓
403 Forbidden
```

Important distinction:

```text
401 → Who are you?
403 → I know who you are, but you cannot do this.
```

---

## 404 Not Found

The requested resource does not exist or cannot be found.

Examples:

```text
GET /commodities/999999
→ 404 Not Found
```

Also appropriate when an endpoint/resource is intentionally not exposed to the requester and the system's security model requires not revealing its existence.

---

## 405 Method Not Allowed

The endpoint exists, but the requested HTTP method is not supported.

Example:

```text
GET /commodities/123
```

when the endpoint only supports:

```text
PATCH /commodities/123
DELETE /commodities/123
```

The server may return:

```text
405 Method Not Allowed
```

---

## 409 Conflict

The request conflicts with the current state of the resource.

Common examples:

- duplicate resource
- unique constraint conflict
- state transition conflict
- concurrent update conflict

Example:

```text
POST /users

Email already exists
→ 409 Conflict
```

Do not use `409` merely because validation failed.

---

## 410 Gone

The resource previously existed but has intentionally been removed and is no longer available.

Use only when this distinction matters.

For most normal "does not exist" situations, use `404`.

---

## 422 Unprocessable Content

The request is syntactically valid but fails semantic validation.

Common API example:

```json
{
    "quantity": -10
}
```

The JSON is valid, but the business/input rules reject the value.

Application API commonly uses `422` for request validation errors.

Kiro should understand that:

```text
400 → malformed/invalid request structure
422 → structurally valid request that fails validation
```

The exact choice should remain consistent with the API's established conventions.

---

## 429 Too Many Requests

The client has exceeded a rate limit.

Example:

```text
100 requests/minute exceeded
→ 429 Too Many Requests
```

A useful response may include:

```text
Retry-After
```

when the server can tell the client when it should retry.

---

# 27.3 Server Error Codes — 5xx

5xx responses generally indicate that the server could not successfully fulfill an otherwise valid request.

## 500 Internal Server Error

An unexpected server-side error occurred.

Use this for genuinely unexpected failures.

Do not expose internal implementation details:

Bad:

```json
{
    "error": "SQLAlchemy IntegrityError at database.py line 183..."
}
```

Better:

```json
{
    "error": "Internal server error",
    "request_id": "abc123"
}
```

Detailed exception information should go to secure server logs, not to the client.

---

## 501 Not Implemented

The server does not support the functionality required to fulfill the request.

This should not be used as a generic substitute for:

> "We haven't implemented this endpoint yet."

Use it carefully because many APIs simply return an appropriate application-level error or do not expose the unfinished endpoint.

---

## 502 Bad Gateway

A server acting as a gateway or proxy received an invalid response from an upstream service.

Example:

```text
Application API
   ↓
External API
   ↓
Invalid upstream response
   ↓
502
```

---

## 503 Service Unavailable

The service is temporarily unable to handle the request.

Possible causes:

- service overload
- temporary maintenance
- unavailable dependency
- insufficient capacity

Useful when the failure is expected to be temporary.

---

## 504 Gateway Timeout

A gateway/proxy did not receive a timely response from an upstream service.

Example:

```text
API
 ↓
External forecasting service
 ↓
Timeout
 ↓
504 Gateway Timeout
```

---

# 27.4 Exception Handling

## Concept

Exceptions represent failures or exceptional conditions inside application code.

An exception should be handled at the appropriate architectural boundary.

For example:

```text
Database Layer
    ↓
raises database exception
    ↓
Service Layer
    ↓
translates into domain/application error
    ↓
API Layer
    ↓
returns appropriate HTTP response
```

Do not expose raw infrastructure exceptions directly to API clients.

---

## Exception Categories

Kiro should distinguish between:

### Expected Business Errors

Examples:

```text
Commodity does not exist
User lacks permission
Crop cannot be planted during this period
Forecast job is already running
```

These should become predictable application/API responses.

### Validation Errors

Examples:

```text
Invalid date
Negative quantity
Unsupported commodity
Malformed request
```

These should return appropriate 4xx responses.

### Infrastructure Errors

Examples:

```text
Database unavailable
Redis unavailable
External API timeout
Message broker unavailable
```

These require controlled handling and logging.

### Unexpected Programming Errors

Examples:

```text
AttributeError
TypeError
unexpected None
logic bug
```

These should generally become `500 Internal Server Error` while detailed diagnostics remain in logs.

---

# 27.5 Exception Handling Rules for Kiro

### Rule 1

Never use `200 OK` to represent a failed operation.

Bad:

```json
HTTP 200

{
    "success": false,
    "error": "User not found"
}
```

Prefer:

```text
404 Not Found
```

when the requested resource does not exist.

### Rule 2

Do not return `500` for expected client errors.

Bad:

```text
Invalid user input
→ 500
```

Prefer:

```text
422
```

or another appropriate 4xx status.

### Rule 3

Do not expose internal exceptions to clients.

Avoid returning:

- stack traces
- SQL queries
- database credentials
- internal file paths
- framework internals
- secret values

### Rule 4

Log unexpected failures with enough context to diagnose them.

Useful information includes:

- request ID
- endpoint
- authenticated actor where appropriate
- exception type
- stack trace
- relevant non-sensitive context

### Rule 5

Use consistent error response structures.

Example:

```json
{
    "error": {
        "code": "COMMODITY_NOT_FOUND",
        "message": "Commodity was not found.",
        "details": null
    },
    "request_id": "abc123"
}
```

The exact structure should be defined by the project's API contract.

### Rule 6

Separate internal exceptions from public API errors.

Do not make every internal exception class automatically become a public HTTP error.

### Rule 7

Handle exceptions at the correct boundary.

A database repository should not need to know that an HTTP response should be `404`.

Instead:

```text
Repository
→ raises/returns domain-relevant failure

Service
→ determines business meaning

API layer
→ maps that failure to HTTP status
```

### Rule 8

Do not catch `Exception` everywhere.

Bad:

```python
try:
    ...
except Exception:
    return None
```

This can hide serious failures.

Catch specific exceptions when recovery or translation is possible.

### Rule 9

Do not silently swallow exceptions.

If an exception is intentionally ignored, document why.

### Rule 10

Exception handling must account for retries.

If an operation can be retried, combine exception handling with idempotency where necessary.

Example:

```text
Request
 ↓
Timeout
 ↓
Client retries
 ↓
Did the first request actually complete?
```

This is why exception handling, idempotency, transactions, and distributed systems must be considered together.

---

# 27.6 HTTP Status Code Quick Reference

| Code | Meaning | Typical Application |
|---|---|---|
| 200 | OK | Successful request with response |
| 201 | Created | Resource created |
| 202 | Accepted | Async operation queued |
| 204 | No Content | Successful operation without body |
| 400 | Bad Request | Malformed/general invalid request |
| 401 | Unauthorized | Missing/invalid authentication |
| 403 | Forbidden | Authenticated but not permitted |
| 404 | Not Found | Resource does not exist |
| 405 | Method Not Allowed | Unsupported HTTP method |
| 409 | Conflict | Current resource state conflicts |
| 410 | Gone | Resource permanently removed |
| 422 | Unprocessable Content | Semantic/validation failure |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unexpected server failure |
| 501 | Not Implemented | Unsupported server functionality |
| 502 | Bad Gateway | Invalid upstream response |
| 503 | Service Unavailable | Temporary service unavailability |
| 504 | Gateway Timeout | Upstream request timed out |

---

# 27.7 Status Codes as Part of API Design

HTTP status codes are not merely error messages.

They affect how clients behave.

For example:

```text
401 → refresh/login authentication
403 → do not retry authentication
404 → resource may not exist
409 → resolve state conflict
422 → fix request data
429 → wait and retry according to policy
500 → investigate server failure
502/503/504 → potentially retry with backoff depending on operation
```

Therefore, incorrect status codes can cause incorrect client behavior.

Kiro should evaluate status codes as part of the API's **behavioral contract**, not just its documentation.

---

# 27.8 Retry Safety

When designing retries, Kiro should consider:

```text
Is the operation idempotent?
        ↓
       YES
        ↓
Can retry safely?
```

For non-idempotent operations:

```text
POST /orders
POST /payments
POST /jobs
```

consider idempotency keys or another deduplication mechanism before automatic retries.

For temporary infrastructure failures:

```text
502
503
504
```

a bounded retry with exponential backoff may be appropriate.

Do not blindly retry:

```text
400
401
403
404
422
```

because the underlying request usually needs to change or authentication/authorization needs to be resolved.

---

# 27.9 Technology-Neutral API Exception Handling

For any HTTP-based API, the general flow should be:

```text
Business/Application Operation
          ↓
Domain/Application Failure
          ↓
Boundary Error Mapping
          ↓
HTTP Status + Safe Error Response
```

The internal error should not need to be represented exactly as an HTTP error throughout the system.

### Problems This Prevents

- transport-specific logic leaking into business logic
- inconsistent status codes
- accidental exposure of internal details
- duplicated error formatting
- difficult replacement of the transport layer

The implementation mechanism depends on the chosen architecture and technology.

---

# 27.10 Kiro Decision Rule

When reviewing an API endpoint, Kiro should ask:

1. What happens on success?
2. What happens when the resource does not exist?
3. What happens when authentication is missing?
4. What happens when authorization fails?
5. What happens when validation fails?
6. What happens when a duplicate/conflicting operation occurs?
7. What happens when rate limits are exceeded?
8. What happens when the database fails?
9. What happens when an external service times out?
10. What happens when the client retries?
11. Are status codes semantically correct?
12. Are sensitive exception details hidden?
13. Are errors consistent across endpoints?
14. Can clients determine whether retrying is safe?

An API is not complete merely because the happy path works.

A robust API defines **success, expected failure, unexpected failure, and retry behavior**.


# 28. Scenario-First Engineering

The primary purpose of this knowledge base is to help an agent recognize **problems before choosing solutions**.

For every concept, Kiro should reason through four questions:

## 1. What scenario exists?

Examples:

- repeated expensive reads
- duplicate requests
- concurrent updates
- slow processing
- dependency failure
- too many incoming requests
- stale data
- inconsistent state
- difficult-to-maintain code
- unauthorized access
- difficult debugging
- growing workload

## 2. What failure or cost can happen?

Examples:

- database overload
- duplicate records
- data corruption
- race conditions
- cascading failure
- poor latency
- resource exhaustion
- security breach
- inconsistent state
- operational complexity

## 3. Which concepts could address the scenario?

Multiple concepts may apply.

For example:

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

The correct choice depends on the actual constraint.

## 4. What is the simplest sufficient solution?

Kiro should prefer the smallest solution that reliably addresses the demonstrated problem.

Do not introduce additional infrastructure or abstraction unless the problem justifies it.

---

# 29. Concept Relationship Thinking

Many system failures happen because concepts are considered independently.

Kiro should evaluate related concepts together.

### Caching

Consider:

```text
Caching
+ invalidation
+ TTL
+ stampede protection
+ stale data
+ dependency failure
```

### Messaging

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

### Concurrency

Consider:

```text
Concurrency
+ shared state
+ race conditions
+ transactions
+ locking
+ idempotency
```

### APIs

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

### Database writes

Consider:

```text
Database writes
+ transactions
+ constraints
+ concurrency
+ locking
+ retries
```

### Distributed systems

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

# 30. What Kiro Should Produce When Recommending a Concept

When Kiro recommends applying a concept, the recommendation should explain:

### Problem

What actual problem was observed?

### Concept

What engineering concept addresses it?

### Why

Why does the concept fit this scenario?

### Alternative

What simpler alternatives were considered?

### Trade-offs

What new complexity or failure modes does it introduce?

### Scope

Where should it be applied?

### Non-Scope

Where should it not be applied?

### Verification

How can we determine whether the change actually improved the system?

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
Measure cache hit rate, latency, database load, and correctness.
```

This is the preferred reasoning format for the knowledge base.

# 31. Recommended Knowledge Directory Template

For larger Kiro projects, the master document can eventually be split into focused documents:

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
├── specialists/
│   ├── backend.md
│   ├── frontend.md
│   ├── database.md
│   └── security.md
│
└── knowledge/
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

This directory is a **template**, not a requirement that every project contain every file.

Create a knowledge document only when the project benefits from that concept.

---

# 32. Recommended `knowledge/INDEX.md` Template

The index should be small enough to load cheaply.

Example:

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

- Repeated expensive reads → caching, indexing, query optimization
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

The index should point Kiro toward the appropriate concept without requiring the full knowledge base to be loaded.

---

# 33. Recommended Knowledge Document Template

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

Explain the mechanism without tying it to a particular programming language.

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

This structure keeps each document focused and makes selective retrieval more useful.

---

# 34. Token-Efficiency Principle

The knowledge base should be **large in storage but selective in context**.

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

The goal is therefore:

> **Large knowledge base + small always-loaded context + selective concept retrieval.**

This principle should be considered whenever new engineering knowledge is added to the project.
