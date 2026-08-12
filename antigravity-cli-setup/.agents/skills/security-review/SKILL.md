---
name: security-review
description: Reviews implementation plans and code for authentication, authorization, secrets, injection, unsafe operations, transport security, and data exposure.
---

# Security Review

Use when touching:
- authentication or authorization
- credentials or secrets
- external input
- database queries
- file handling
- shell commands
- network access
- serialization/deserialization
- permissions
- sensitive data
- deployment configuration

Check:
1. trust boundaries
2. input validation
3. authorization
4. secret handling
5. injection risks
6. unsafe file/system operations
7. TLS/security configuration
8. logging and error disclosure
9. dependency/supply-chain risk
10. least privilege

Report concrete findings and remediation steps.
