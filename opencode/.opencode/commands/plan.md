---
description: Produce the smallest complete diff for a change, before any edit
agent: warroom
---

Plan this change: $ARGUMENTS

Do not edit any file. Load the `workflow` skill and follow steps 1 through 4.

Then task `cartographer` with the planning work, and return its plan to this session
so we can discuss it before anything is written.

The plan must name **exact files** and what changes in each one. "Update the
service layer" is not a plan — it is a topic.

It must also state:

- What is explicitly **not** changing, and what would make this need re-planning.
- Which unit owns each part if the change spans more than one area.
- Anything that needs a design decision you cannot make from the code — and the
  specific question you would ask the user about it.

Prefer the smallest change that fully satisfies the request. A complete change
that touches three files beats a clever one that touches twelve.