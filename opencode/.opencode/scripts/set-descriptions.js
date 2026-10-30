#!/usr/bin/env node
// Rewrites the `description:` line of every agent frontmatter.
//
// The agent `name` is derived from the filename and CANNOT be set from
// frontmatter — verified against a running server. The description is the only
// text the @ picker has to work with, so this keeps the purpose in the first
// few words, where it survives truncation, and keeps the routing cues after it.
//
//   node .opencode/scripts/set-descriptions.js

const fs = require("fs");
const path = require("path");

// [file, description]
// Shape: CALLSIGN — what it does. When to reach for it. NOT for X → Y.
const DESCRIPTIONS = {
  "warroom.md":
    "WARROOM — orchestration: classify, delegate, verify, integrate. Default agent for any multi-step task. Skip only when the user named a specific unit or it is a one-line edit.",
  "outrider.md":
    "OUTRIDER — fast read-only code search: find files, symbols, callers, config, \"where is X\". Never edits. NOT for design decisions → cartographer.",
  "cipher.md":
    "CIPHER — external research: official docs, current library APIs, version-specific behaviour, prior art on the web. NOT for code in this repo → outrider.",
  "cartographer.md":
    "CARTOGRAPHER — planning and architecture: design options, trade-offs, sequencing, blast radius. Writes plan files, no code. NOT for a decided fix → hammer.",
  "hammer.md":
    "HAMMER — precise code changes within an agreed file set. Implements a plan that is already decided. Never wanders outside its paths. NOT for choosing the approach → cartographer.",
  "mason.md":
    "MASON — UI/UX and frontend: components, styling, layout, responsive behaviour, accessibility, render cost. Anything the user sees or touches. NOT for API contracts → hammer.",
  "examiner.md":
    "EXAMINER — root-cause debugging: hard bugs, crashes, race conditions, confusing failures. Never edits. Use when the cause is unknown, or when two fixes have already failed.",
  "aegis.md":
    "AEGIS — security review: auth, authz, secrets, injection, SSRF, IDOR, data exposure, dependencies. Reports findings, never edits. Use for any trust boundary.",
  "adjutant.md":
    "ADJUTANT — documentation and records: READMEs, comments, ADRs, changelogs, brain entries. Explains existing code and keeps the written record. NOT for changing code to match a doc.",
  "quartermaster.md":
    "QUARTERMASTER — git analysis: repo state, commit messages, PR titles and bodies, branch diffs. Read-only. Drafts the text; never stages, commits, or pushes.",
};

const dir = path.join(process.cwd(), ".opencode/agents");
let changed = 0;

for (const [file, desc] of Object.entries(DESCRIPTIONS)) {
  const p = path.join(dir, file);
  if (!fs.existsSync(p)) {
    console.log(`  MISSING  ${file}`);
    continue;
  }
  const raw = fs.readFileSync(p, "utf8");
  const line = `description: ${JSON.stringify(desc)}`;
  const next = raw.replace(/^description:.*$/m, line);
  if (next !== raw) {
    fs.writeFileSync(p, next);
    changed++;
    console.log(`  set  ${file.padEnd(20)} ${desc.length} chars`);
  }
}

console.log(`\n${changed}/${Object.keys(DESCRIPTIONS).length} descriptions rewritten`);