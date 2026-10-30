# Decisions

One file per decision: `NNNN-short-slug.md`. Number sequentially so the order is
obvious.

```md
# NNNN — <decision, stated as what was decided>

**Status:** accepted | superseded by NNNN
**Date:** YYYY-MM-DD
**Area:** <module or subsystem>

## Context
What was true at the time. The constraint that made this hard. Constraints
expire — this is how a future reader knows whether it still applies.

## Decision
What was decided, in the present tense.

## Consequences
What this makes easy, and what it makes hard. Include what is now awkward.

## Alternatives
What was considered and rejected, and why. This is the part that stops the
next person re-running the same analysis.
```

Rules:

- **One decision per file.** A file covering three decisions cannot be
  superseded one decision at a time.
- **Never delete a decision.** Mark it superseded and link the replacement. The
  history of what was believed and when is half the value.
- **Record the why, not the what.** The code already says what was done.
- **Cite evidence** — a `path:line`, a benchmark, an issue, or a named incident.
- Add one line to `../INDEX.md` when you create a file, and when you supersede
  one.