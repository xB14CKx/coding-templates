# Brain Index

The lookup table. **Grep this, do not read this whole file.** Read only the
entry that matches, then only the file it points to.

Format: one line per entry, `area | one-line gist | path`.

| Area | Note | Entry |
|---|---|---|
| models | catalog `status`/naming/pagination are unreliable — benchmark before trusting | [pitfall](pitfalls/model-catalog-is-not-truth.md) |
| config | per-agent `model` is inert; unset default silently falls back to a PAID model | [pitfall](pitfalls/per-agent-model-is-inert.md) |
| template | `.opencode/` is the copy unit, not a duplicate; root `package.json`/`node_modules` are generated | [pitfall](pitfalls/template-root-artifacts-are-generated.md) |

<!--
New entries go in this table. Sort by area. Keep one line each — a line that
wraps is a note that has not been distilled yet.

When this table passes ~80 lines, run the distil pass from the `second-brain`
skill: merge duplicates, delete what the code now says, promote repeat
pitfalls into rules.
-->

## Kinds

| Kind | Directory | Answers |
|---|---|---|
| decision | `decisions/` | Why is it built this way? |
| pattern | `patterns/` | How does this codebase do X? |
| pitfall | `pitfalls/` | What broke, and why? |
| stack | `stack.md` | What is this project, and how do I run it? |
| inbox | `inbox.md` | Not filed yet. |