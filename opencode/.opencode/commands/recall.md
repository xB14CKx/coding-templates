---
description: Recall what the brain already knows about a topic
agent: warroom
---

What does the brain know about: $ARGUMENTS

Load the `second-brain` skill. **Recall, do not summarise from memory.**

```sh
grep -i "<topic>" .opencode/brain/INDEX.md
```

Then read only the entries that match, and only the files they point to.

Return:

1. **What is recorded** — each matching entry, with its path.
2. **What it means for this task** — the rule that applies, in one line each.
3. **What is not recorded** — if the topic has no entry, say so plainly. A gap
   in the brain is worth knowing; a confident invention is not.
4. **Conflicts** — if an entry contradicts what you can see in the code, flag it
   and say which is current. The code wins; the entry needs correcting.

Do not read the whole brain to answer a narrow question. If you are about to
load every entry, the question is too broad — narrow it and ask again.