---
description: Record a decision, pattern, or pitfall in the brain
agent: adjutant
---

Record this in the brain: $ARGUMENTS

Load the `second-brain` skill. Work in `.opencode/brain/`.

1. **Classify** the note — `decisions/` (why it is built this way),
   `patterns/` (how this codebase does a recurring thing), or `pitfalls/` (what
   broke and what it cost). Use `inbox.md` only if you genuinely cannot
   classify it yet, and say why.
2. **Check for an existing entry** on the same subject. If one exists, correct
   it. Never add a second, contradictory note.
3. **Write the entry** using the template in that directory's `README.md`.
   Every claim cites a `path:line`, a command output, or a named incident. An
   uncited note is a rumour and will be trusted as fact.
4. **Add exactly one line** to `INDEX.md`, sorted by area.

Do not record what the code already plainly says, anything unconfirmed, or
anything true only for this moment. Do not record a secret — name the variable
or file, never the value.

Report the file written and the index line added. Nothing else.