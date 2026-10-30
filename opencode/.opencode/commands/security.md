---
description: Security audit of the current changes or a named area
agent: aegis
subagent: true
---

Security review of: $ARGUMENTS

Load the `security-review` skill and follow its checklist in full, then walk the
`code-review` ordering within it.

Read `CONVENTIONS.md` and `.opencode/brain/stack.md` first, so you judge the
code against the stack it actually runs on.

For each finding, in severity order:

1. **Severity** — Critical, High, Medium, Low.
2. **Location** — `path:line`.
3. **Attack path** — what an attacker concretely does, step by step. A finding
   without a concrete path is not a finding; do not report it.
4. **Fix** — the specific change, and the trade-off it introduces.
5. **Evidence** — the code that proves it.

Never print a secret, token, or key. Name the file. If a committed secret turns
up, say it must be rotated — deleting the file does not un-leak it, and
read-only git inspection can pull it back out of history.

Close with the single thing you would fix first, and state which categories you
checked and found clean. Do not pad the report.