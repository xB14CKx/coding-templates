#!/usr/bin/env node
// Structural check for the template. Run from the project root:
//   node .opencode/scripts/verify-template.js
//
// Validates that every agent, skill, and command parses, that the config
// resolves, and that every agent named in `default_agent` or in a command's
// `agent:` field actually exists. It does not check content quality — it
// catches the mechanical breakage that a rename or a hand edit introduces.

const fs = require("fs");
const path = require("path");

const root = process.cwd();
const oc = path.join(root, ".opencode");

let failures = 0;
const fail = (msg) => {
  console.log(`  FAIL  ${msg}`);
  failures++;
};

/** Minimal frontmatter reader: returns the raw block, we parse it as JSON-ish YAML. */
function frontmatter(file) {
  const raw = fs.readFileSync(file, "utf8");
  if (!raw.startsWith("---\n")) return null;
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return null;
  return raw.slice(4, end + 1);
}

/** Enough YAML for frontmatter: scalars, and one level of list-of-mappings. */
function parseFrontmatter(text) {
  const out = {};
  let key = null;
  let inList = false;
  for (const line of text.split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const listItem = line.match(/^\s*-\s+(.*)$/);
    if (listItem && inList) {
      if (!Array.isArray(out[key])) out[key] = [];
      out[key].push(listItem[1]);
      continue;
    }
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    key = kv[1];
    const val = kv[2].trim();
    if (val === "") {
      inList = true;
      out[key] = [];
    } else {
      inList = false;
      out[key] = val.replace(/^["']|["']$/g, "");
    }
  }
  return out;
}

const readDir = (d) =>
  fs.existsSync(d) ? fs.readdirSync(d).filter((f) => f.endsWith(".md")) : [];

// --- agents ---
const agentIds = new Set();
for (const f of readDir(path.join(oc, "agents"))) {
  const file = path.join(oc, "agents", f);
  const fm = frontmatter(file);
  if (!fm) {
    fail(`agents/${f} has no frontmatter`);
    continue;
  }
  const d = parseFrontmatter(fm);
  const id = f.replace(/\.md$/, "");
  agentIds.add(id);
  if (!d.description) fail(`agents/${id} missing description`);
  if (d.mode !== "all") fail(`agents/${id} mode is "${d.mode}", expected "all"`);
  if (!d.steps) fail(`agents/${id} missing steps cap`);
  if (!d.color) fail(`agents/${id} missing color`);
}

// --- skills ---
const skillIds = new Set();
const skillsDir = path.join(oc, "skills");
if (fs.existsSync(skillsDir)) {
  for (const d of fs.readdirSync(skillsDir)) {
    const s = path.join(skillsDir, d, "SKILL.md");
    if (!fs.existsSync(s)) continue;
    const fm = frontmatter(s);
    if (!fm) {
      fail(`skills/${d} missing frontmatter`);
      continue;
    }
    const p = parseFrontmatter(fm);
    if (!p.description) fail(`skills/${d} missing description`);
    skillIds.add(d);
  }
}

// --- commands ---
const commandNames = new Set();
for (const f of readDir(path.join(oc, "commands"))) {
  const name = f.replace(/\.md$/, "");
  commandNames.add(name);
  const fm = frontmatter(path.join(oc, "commands", f));
  if (!fm) {
    fail(`commands/${f} has no frontmatter`);
    continue;
  }
  const d = parseFrontmatter(fm);
  if (!d.description) fail(`commands/${name} missing description`);
  if (d.agent && !agentIds.has(d.agent)) {
    fail(`commands/${name} targets unknown agent "${d.agent}"`);
  }
}

// --- config ---
const cfgPath = path.join(oc, "opencode.jsonc");
if (!fs.existsSync(cfgPath)) {
  fail("no .opencode/opencode.jsonc");
} else {
  const stripped = fs
    .readFileSync(cfgPath, "utf8")
    .split("\n")
    .map((l) => l.replace(/^\s*\/\/.*$/, ""))
    .join("\n");
  let cfg;
  try {
    cfg = JSON.parse(stripped);
  } catch (e) {
    fail(`opencode.jsonc does not parse: ${e.message}`);
    cfg = null;
  }
  if (cfg) {
    if (!cfg.default_agent) fail("config missing default_agent");
    else if (!agentIds.has(cfg.default_agent))
      fail(`default_agent "${cfg.default_agent}" is not a defined agent`);
    if (!cfg.experimental?.policies?.length) fail("no policies resolved");
    for (const id of Object.keys(cfg.agents ?? {})) {
      if (!agentIds.has(id)) fail(`config references unknown agent "${id}"`);
    }
  }
}

// --- brain ---
for (const p of ["INDEX.md", "stack.md", "inbox.md"]) {
  if (!fs.existsSync(path.join(oc, "brain", p))) fail(`brain/${p} missing`);
}

console.log(`agents=${agentIds.size} skills=${skillIds.size} commands=${commandNames.size}`);
if (failures) {
  console.log(`${failures} problem(s) found`);
  process.exit(1);
}
console.log("template structure OK");