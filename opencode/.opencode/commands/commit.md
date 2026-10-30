---
description: Produce commit messages and PR text from the current repository state
agent: quartermaster
subagent: true
---

Write the commit and PR text for: $ARGUMENTS

Load `code-review` only for the "is this actually done" check. Everything else
is your own procedure: read the real git state, never the commit message's
version of events.

Then produce:

1. **Scope** — staged, unstaged, and untracked, and the base ref you compared
   against.
2. **Changesets** — one group per logical change, with its files. Split
   unrelated work; if it cannot be split cleanly, say so and list the groups.
3. **Commit text** — subject (`type(scope): imperative summary`, 72 characters
   or fewer, no trailing period), body explaining why and what a user will
   notice, and footers including `BREAKING CHANGE:` when a contract, schema, or
   config key changes. One fenced block, ready to paste.
4. **PR text** — title under 72 characters, body with `## Summary`,
   `## Changes`, and `## Testing`.
5. **Notes** — anything that should stay out of the commit: debug output,
   commented-out code, untracked files, lockfile churn, or a secret that needs
   rotating before it is staged.

Verify the change against the code before you describe it. Never claim a test
passes because a test file was added.

You never stage, commit, or push — the developer does that. Hand over the text.