# Patterns

How this codebase does a recurring thing — the thing you would otherwise have to
rediscover by reading three files.

```md
# <The thing, e.g. "Adding an endpoint">

**Area:** <module>

## The pattern
The shape of it, in a numbered sequence short enough to follow at a glance.

## Canonical example
A **real** path to a real file that does it correctly. Not an idealized
snippet — the actual code in this repository.

## Variations
Where the shape differs, and why. Note the ones that are wrong.

## Do not
The specific mistake this codebase has already made once.
```

Rules:

- **Cite a real path.** If the example does not exist, it is not a pattern yet.
- **One pattern per file.** Patterns that belong together belong in one.
- **Record the exception, not the rule, when the rule is obvious.** The code
  shows the rule; only the exception is worth writing down.
- **Do not restate the framework.** "Use the ORM for queries" is not knowledge.
- When a pattern stops being how this codebase works, update or delete it. A
  wrong pattern is worse than a missing one — it sends the next unit confidently
  in the wrong direction.
- Add one line to `../INDEX.md`.