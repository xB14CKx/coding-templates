---
description: Take a request from idea to reviewed, verified change
agent: warroom
---

Ship this: $ARGUMENTS

Run the whole pipeline. Load `workflow`, and load `dispatch` the moment you
consider fanning out.

**1 — Understand.** Classify the intent. Recall from the brain. If the request is
genuinely ambiguous, stop and ask one question. Do not guess a scope and build
for three hours.

**2 — Recon.** Task `outrider` in the background to map the affected area: the
existing implementation, the callers, the tests, and the conventions that apply.
Read-only, so it costs nothing to run while you think.

**3 — Decide.** If the design is not forced by the code — a real choice, a large
blast radius, an unclear cause — task `cartographer`. Otherwise decide inline and
move on. Do not escalate ceremony.

**4 — Partition.** Name the file set. If it is more than one independent area,
load `dispatch`, write the partition rule, and state which unit owns which
paths. If any file would be touched by two units, fix the partition first.

**5 — Implement.** Task `hammer` with the plan and the exact file set. One unit
per partition.

**6 — Review.** Once the diff exists, load `code-review`. Task `aegis` in the
background if the change touches a trust boundary. A unit reviewing its own work
reviews nothing — so the review happens here, in WARROOM, against the real diff.

**7 — Verify.** Run the checks from `.opencode/brain/stack.md`. Report the exact
command and its exact output. If the suite is CI's, say the change is unverified
until CI runs — do not claim otherwise.

**8 — Record.** Anything non-obvious the task revealed goes into the brain, per
the `second-brain` skill. One line in `INDEX.md`. Do this before you finish, not
later.

**9 — Debrief.** One answer:

- Files changed, one line each.
- What changed, in the terms of the request.
- Verified: commands run and their real results.
- Not verified, stated plainly.
- Risks, only if real.

Then stop. Do not commit, do not push, do not open a PR — `/commit` drafts that
text, and the developer decides.