---
name: exception-design
description: Designs and reviews exception handling, error translation, validation failures, retries, and failure recovery without hiding defects.
---

# Exception Design

For each failure:
- identify where it originates
- determine which layer can handle it
- translate it only at an appropriate boundary
- preserve useful context
- avoid leaking sensitive internals
- distinguish expected failures from programming errors
- consider retryability
- avoid broad catch-and-ignore patterns

Check:
- API error contracts
- database failures
- external service failures
- timeout behavior
- background job failures
- duplicate/retry behavior
- logging and observability
