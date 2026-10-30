---
description: Detect this project's stack and record it in the brain
agent: warroom
---

Onboard this repository: $ARGUMENTS

Load the `onboarding` skill and follow it. Survey the tree, the manifests, the
build files, and the CI workflows in parallel where you can.

Then:

1. Write `.opencode/brain/stack.md` — runtime, layout, commands, conventions,
   CI, constraints. Every claim cites a file. Do not carry over the template
   placeholders.
2. Mark a command **Verified** only if you actually ran it. Guess, and mark it
   unverified.
3. Add one line per section to `.opencode/brain/INDEX.md`.
4. Write or refine `CONVENTIONS.md` — a short list of real rules, not a style
   guide. Only rules you have evidence for.

Do not read source files to do this. Manifests and CI answer the question for a
fraction of the cost.

If `stack.md` already has content, read it first and preserve anything you
cannot re-derive. Report what you changed and what you left alone.