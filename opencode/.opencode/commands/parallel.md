---
description: Run a fan-out of independent units over a defined objective
agent: warroom
---

Fan out over: $ARGUMENTS

Load the `dispatch` skill and follow it end to end. This command exists to
exercise the full parallel protocol.

Before dispatching, state in this session:

1. **The partition rule** — by path, by layer, by explicit file list, or
   read/write split. One sentence.
2. **The track table** — which unit owns which paths, and what "done" means for
   each. If any file appears twice, fix the partition before dispatching.
3. **The concurrency cap** — how many run at once.

Then launch the independent tracks together in the background. Do not dispatch
them one at a time and wait; that is the cost without the benefit.

When they return, **reconcile** — check `git status --short` and
`git diff --stat` against what each unit claimed, and re-read anything that
does not match. Then integrate the seams yourself and report as one answer.

If a track fails, say which, what it blocks, and what the options are. Do not
silently retry it, and do not skip its scope.