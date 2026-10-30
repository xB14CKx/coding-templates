# Template-root artifacts are generated, and `.opencode/` is the copy unit

Two things that look like mistakes in `templates/opencode/` and are not.

## 1 — `.opencode/` inside this folder is not a duplicate

OpenCode discovers project config, agents, skills and commands from a directory
named **exactly** `.opencode/`. It cannot be renamed or flattened. The outer
folder is only a shelf label in the parent `templates/` repo, and it is never
copied into a project — only `.opencode/`, `AGENTS.md` and `CONVENTIONS.md` are
(README.md § Install). The same nesting convention holds for both siblings:
`antigravity-cli-setup/.agents/`, `kiro-cli-setup/.kiro/`.

Symptom: "why is there an `opencode` inside `opencode`". Cause: expected flat
layout. Fix: none — do not flatten it.

## 2 — `package.json`, `package-lock.json`, `node_modules/` at this folder's root

Not template content. opencode's plugin bootstrap writes them into the cwd when
it resolves plugins; they are regenerated on any launch. Evidence:

- `.opencode/scripts/*.js` import only `fs` and `path` — no package dependency.
- `.opencode/opencode.jsonc` has no `plugin` key.
- The folder's `.gitignore` already lists `node_modules`, `package.json`,
  `package-lock.json`.

Deleting them is safe (opencode recreates them), but they are not a defect.
`node_modules` here is 62M.

## Verified against

- `node .opencode/scripts/verify-template.js` → `agents=10 skills=9 commands=10`, `template structure OK`
- `node .opencode/scripts/policy-check.js` → `107/107 passed`
- `git ls-files opencode/` in the parent repo → `0` (the whole template is
  untracked; that is the real gap, not the nesting)
