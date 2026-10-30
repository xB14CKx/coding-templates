# Pitfalls

What broke here, and what it actually cost. Written after the fact, from
evidence — not guessed at the time.

```md
# <The symptom, as it was observed>

**Area:** <module> · **Cost:** <how long it took to find>

## Symptom
What was seen — the error, the wrong behaviour. The thing you would search for
next time this happens.

## Cause
The mechanism, not the line. Why it happened.

## Rule
The one sentence that prevents a repeat. It must be checkable.

## Fix
The change that resolved it, and where.
```

Rules:

- **Write the symptom, not the concept.** Someone searching at 2am types the
  error message, not "distributed cache inconsistency".
- **The cause must be a mechanism.** "A typo" is not a cause you can learn from.
- **The rule must be actionable.** "Be careful with dates" is not a rule.
  "Parse dates as UTC at the boundary, never in the handler" is.
- **Promote on recurrence.** A pitfall that happens three times is a rule:
  move it to `patterns/` and add it to `CONVENTIONS.md`.
- **Delete pitfalls the code no longer has.** A stale pitfall is an active
  hazard.
- Add one line to `../INDEX.md`.