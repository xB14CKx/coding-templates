---
name: Exception Design
description: Designs and reviews failure handling — error translation, validation failures, retries, timeouts, and recovery, without hiding defects. Load when adding or changing error handling, defining an API error contract, or deciding whether something should be retried.
---

# Exception Design

Errors are part of the interface. How a system fails is designed, not
accidental.

## For every failure, answer six questions

1. **Where does it originate?** The layer that actually detected the problem.
2. **Which layer can handle it?** Usually not the same one.
3. **Where is it translated?** At a boundary — HTTP, RPC, CLI, queue — and only
   at a boundary.
4. **What context is preserved?** Enough to debug, not enough to leak.
5. **Is it retryable?** Decided deliberately, not assumed.
6. **Is it expected or a defect?** Expected failures get a message and a code.
   Defects get a crash report and a fix.

## Rules

- **Translate only at the boundary.** An internal error type leaking through a
  public API couples your error contract to your implementation.
- **Preserve the cause.** Wrapping without the original loses the only thing
  that had the detail.
- **Never leak internals.** No stack traces, SQL, internal ids, or file paths in
  anything a client can see. Log it server-side, return a stable code.
- **Never swallow.** An empty `catch` with a log is still a failure that changes
  behaviour silently. Either handle it or rethrow.
- **Never catch broadly to keep going.** A bare `catch` converts a bug into a
  mystery later, which is strictly worse than a crash.
- **Do not use exceptions for control flow** on a hot path, and do not return
  error codes *and* throw for the same condition. Pick one convention per
  codebase and follow it.

## Retry and timeout

- Every network call needs a timeout. An unbounded call is a latent outage.
- Retry only what is safe to retry: idempotent operations, or operations with
  an idempotency key. Check whether the operation is idempotent *before*
  deciding to retry.
- Back off exponentially, with jitter. Immediate retries turn a partial outage
  into a total one.
- Cap the attempts. A retry loop with no cap is a denial-of-service tool aimed
  at yourself.
- Retry at one layer, not several. A client, a proxy, and a queue each retrying
  turns one attempt into twenty-seven.
- Distinguish timeout (unknown outcome — may have succeeded) from rejection
  (known outcome). They need different handling.

## Validation

- Validate at the boundary and reject early. A failure that costs nothing is
  better than one that costs a transaction.
- Validate types, ranges, and formats. Do not validate that a value is "sane"
  without saying what sane means.
- Distinguish a validation error (the caller is wrong) from a state error (the
  system is wrong). They get different codes and different fix instructions.
- Never echo the rejected value back if it might contain a secret.

## Deadlocks and cascades

- Acquire locks in a consistent order, always.
- Never hold a lock across a network call.
- A failure in one part of a batch is not a reason to silently skip the rest.
  Report what succeeded and what did not.

## Reviewing

Look for: bare catches, empty catches, swallowed errors, retries without a cap,
network calls without a timeout, internal types escaping a public boundary, and
error messages that either leak or say nothing useful.