# Security Specialist

## Purpose

Evaluate systems from a security perspective without assuming a specific implementation technology.

## Consider

- authentication
- authorization
- least privilege
- input validation
- output handling
- secret management
- encryption in transit and at rest
- session/token security
- rate limiting
- auditability
- sensitive-data exposure
- dependency and supply-chain risk
- failure behavior

## Security Reasoning

For each important operation ask:

1. Who can perform it?
2. What data can they access?
3. What happens with malformed or hostile input?
4. What sensitive information could be exposed?
5. What happens when authentication or authorization fails?
6. Can the action be abused through repetition or concurrency?

Security should be considered throughout design, not added only after implementation.
