---
name: security
description: Security constraints for code changes, secrets, authentication, authorization, external input, and dangerous operations.
---

# Security Rules

- Never expose, print, commit, or hard-code secrets, tokens, passwords, private keys, or credentials.
- Treat user input, API input, files, environment variables, URLs, and external data as untrusted.
- Validate input at trust boundaries.
- Use parameterized queries or safe ORM mechanisms for database access.
- Preserve authentication and authorization boundaries.
- Do not weaken security controls simply to make a test or feature pass.
- Do not disable TLS verification or certificate validation as a shortcut.
- Do not introduce insecure default credentials.
- Avoid logging sensitive data.
- Be cautious with shell commands, dynamic code execution, file deletion, permissions, and network access.
- Never modify `.git/`, SSH credentials, credential stores, or unrelated system files unless explicitly required and safely authorized.
- For destructive or production-affecting operations, stop and require explicit confirmation when the environment does not already provide an appropriate approval boundary.
