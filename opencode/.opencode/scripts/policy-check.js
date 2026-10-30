#!/usr/bin/env node
// Regression test for the hard-deny table in ../opencode.jsonc.
//
// Run it from the PROJECT ROOT after any edit to the policies block:
//   node .opencode/scripts/policy-check.js
//
// It reimplements OpenCode's documented policy matcher — whole-value
// wildcards, `*` = zero-or-more including `/`, `?` = exactly one, last match
// wins — and asserts the verdict for every command that matters.
//
// This is a static check, not a live one: it proves the patterns match what
// they claim, not that the running server enforces them. It exists because the
// git rules are subtle enough to break silently — a `*` that also matches the
// bare command will quietly re-allow `git stash`.
//
// Extend the table whenever you add or reorder a policy.

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const configPath = path.join(root, '.opencode/opencode.jsonc');

if (!fs.existsSync(configPath)) {
  console.error(`not found: ${configPath}\nRun this from the project root.`);
  process.exit(2);
}

const raw = fs.readFileSync(configPath, 'utf8');
const cfg = JSON.parse(raw.split('\n').map((l) => l.replace(/^\s*\/\/.*$/, '')).join('\n'));
const policies = cfg.experimental?.policies;

if (!policies?.length) {
  console.error('no policies found at experimental.policies');
  process.exit(2);
}

function toRe(pattern) {
  let out = '^';
  for (const ch of pattern) {
    if (ch === '*') out += '.*';
    else if (ch === '?') out += '.';
    else out += ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  return new RegExp(out + '$', 's');
}

// Returns the effect of the LAST matching rule, or 'fallthrough' when no rule
// matches — in which case the agent's own permissions decide.
function evaluate(value) {
  let last = null;
  for (const rule of policies) {
    if (toRe(rule.resource).test(value)) last = String(rule.effect).toLowerCase();
  }
  return last ?? 'fallthrough';
}

// [permission action, value the tool would check, expected verdict]
const T = [
['shell','git status','allow'],['shell','git status --short','allow'],['shell','git diff','allow'],
['shell','git diff HEAD~1','allow'],['shell','git log --oneline -5','allow'],['shell','git show abc','allow'],
['shell','git blame f','allow'],['shell','git ls-files','allow'],['shell','git rev-parse --show-toplevel','allow'],
['shell','git merge-base HEAD main','allow'],['shell','git show-ref','allow'],
['shell','git show-ref --verify refs/heads/main','allow'],['shell','git branch','allow'],
['shell','git branch -a','allow'],['shell','git branch --show-current','allow'],
['shell','git branch --contains abc','allow'],['shell','git tag','allow'],['shell','git tag -l','allow'],
['shell','git tag --list','allow'],['shell','git stash list','allow'],['shell','git stash show','allow'],
['shell','git remote -v','allow'],['shell','git worktree list','allow'],
['shell','git config --get user.email','allow'],['shell','git cherry main','allow'],
// A global flag before the subcommand must not fall into the blanket deny.
['shell','git -C /home/me/repo status --porcelain','allow'],
['shell','git -C /home/me/repo log --oneline -5','allow'],
['shell','git -C /home/me/repo diff HEAD','allow'],
['shell','git -C /home/me/repo show abc','allow'],
['shell','git -C /home/me/repo ls-files','allow'],
['shell','git -C /home/me/repo rev-parse --show-toplevel','allow'],
['shell','git -C /home/me/repo blame f','allow'],
// ...but the same flag must not smuggle a mutator through.
['shell','git -C /home/me/repo commit -m x','deny'],
['shell','git -C /home/me/repo push','deny'],
['shell','git -C /home/me/repo branch -d f','deny'],
['shell','git commit -m x','deny'],['shell','git commit','deny'],['shell','git push','deny'],
['shell','git push --force','deny'],['shell','git add .','deny'],['shell','git checkout f','deny'],
['shell','git switch main','deny'],['shell','git restore x','deny'],['shell','git reset --hard','deny'],
['shell','git clean -fd','deny'],['shell','git merge main','deny'],['shell','git rebase main','deny'],
['shell','git stash','deny'],['shell','git stash push -m wip','deny'],['shell','git fetch origin','deny'],
['shell','git clone url','deny'],['shell','git init','deny'],['shell','git mv a b','deny'],
['shell','git branch -d f','deny'],['shell','git branch -D f','deny'],['shell','git branch -ad f','deny'],
['shell','git branch newb','deny'],['shell','git branch -m o n','deny'],['shell','git branch -c a b','deny'],
['shell','git branch --set-upstream-to=m f','deny'],['shell','git show-ref --delete refs/heads/x','deny'],
['shell','git reflog delete HEAD@{1}','deny'],['shell','git reflog expire --all','deny'],
['shell','git tag -d v1','deny'],['shell','git tag v2','deny'],['shell','git tag -a v2 -m m','deny'],
['shell','git remote add o u','deny'],['shell','git remote set-url o u2','deny'],
['shell','git remote rm o','deny'],['shell','git worktree remove ../x','deny'],
['shell','git worktree add ../x','deny'],['shell','git config --global user.email a@b.c','deny'],
['shell','git config --unset core.x','deny'],['shell','git config --edit','deny'],
['shell','git cat-file -p abc','deny'],['shell','git cherry-pick abc','deny'],
['shell','gh pr create','deny'],['shell','glab mr create','deny'],['shell','hub push','deny'],
['shell','sudo rm -rf /var','deny'],['shell','su - root','deny'],['shell','doas ls','deny'],
['shell','rm -rf /','deny'],['shell','rm -rf / tmp','deny'],
['shell','rm -rf ~','deny'],['shell','rm -rf ~/','deny'],['shell','rm -rf $HOME','deny'],
['shell','rm -rf $HOME/*','deny'],
// `rm -rf /*` CANNOT be hard-denied here. Matching "argument is literally /*"
// needs an escaped asterisk, and the policy language has no escape for `*` —
// the only pattern that catches it (`shell:rm -rf /*`) also matches every other
// absolute path. It therefore falls through to the `rm -rf *` ask rule in
// Block 2, where the developer sees the exact command and approves or rejects.
// That trade is deliberate: hard-denying all absolute paths would make the
// policy unusable and would train people to delete it.
['shell','rm -rf /*','fallthrough'],
// Ordinary scoped deletes must also survive to the `ask` layer.
['shell','rm -rf /tmp/opencode/scratch','fallthrough'],['shell','rm -rf ~/Downloads/tmp','fallthrough'],
['shell','rm -rf node_modules','fallthrough'],['shell','rm -f build/output.js','fallthrough'],
['shell','mkfs.ext4 /dev/sda','deny'],['shell','dd if=/dev/zero of=x','deny'],
['read','.env','deny'],['read','services/api/.env','deny'],['read','.env.production','deny'],
['read','Secrets/api.json','deny'],['read','/home/u/.ssh/id_rsa','deny'],
['read','.aws/credentials','deny'],['read','.npmrc','deny'],['read','server.pem','deny'],
['read','.env.example','allow'],['read','.env.template','allow'],
['edit','.env','deny'],['edit','Secrets/api.json','deny'],
];
let pass = 0;
let fail = 0;

for (const [action, value, want] of T) {
  const got = evaluate(`${action}:${value}`);
  const ok = got === want;
  ok ? pass++ : fail++;
  if (!ok) console.log(`  FAIL  expected ${want.padEnd(9)} got ${String(got).padEnd(11)} ${action}:${value}`);
}

console.log(`policy matching: ${pass}/${T.length} passed`);
if (fail) console.log(`${fail} mismatch(es) — fix the policies before shipping this change.`);
process.exit(fail ? 1 : 0);
