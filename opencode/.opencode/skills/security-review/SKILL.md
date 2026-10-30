---
name: Security Review
description: Reviews code and plans against security trust boundaries. Load when touching authentication, authorization, credentials, external input, queries, file or shell handling, network access, serialization, permissions, sensitive data, or deployment configuration.
---

# Security Review

For the full checklist with per-category detail, run the `aegis` unit. This
skill is the short version, for reviewing as you go.

## Order of gravity

1. **Authentication** — is every protected surface actually protected? Token
   lifetime, rotation, revocation.
2. **Authorization** — object-level checks on every read and write, not just the
   list endpoint. Server-side, derived from the validated session, never from a
   field in the request body.
3. **Secrets** — never hard-coded, logged, committed, or returned in an error.
   A committed secret must be rotated; deleting the file does not un-leak it.
   A `PUBLIC_`/`VITE_`/`NEXT_PUBLIC_` variable ships to the browser.
4. **Input** — every boundary parsed and validated by the framework. No trust in
   query, path, header, cookie, or body values.
5. **Injection** — parameterized queries, no shell interpolation, no unsafe
   deserialization, no user-controlled paths.
6. **Output** — user content rendered as text. Unescaped HTML sinks, data in
   `javascript:` URLs, errors rendered as markup.
7. **Transport** — TLS verification never disabled; secure cookie flags.

## Reviewing a design, before it is built

Ask these in order. A missing answer here is cheaper than a missing control
later.

- What is the trust boundary, and what crosses it?
- Who is the actor, and how is their identity established? Can it be forged?
- What does the server check that the client does not?
- What is the failure mode when the check fails — deny, or fall through?
- What is stored that an attacker would want, and how long does it live?
- What can be reached from user input — a URL, a file path, a command, a
  template?
- What is the blast radius of one compromised account?

## Rules

- Report a finding only with a concrete attack path. "This could be insecure" is
  not a finding.
- Never print a secret, token, or key in the report. Name the file.
- Distinguish "this is exploitable now" from "this is fragile and will become
  exploitable". Both matter; conflating them destroys credibility.
- A defence that exists only in the client is not a defence. Say so plainly.
- State when a category was checked and clean. Silence is not evidence.
- Do not pad. One real Critical outranks twelve Low items.