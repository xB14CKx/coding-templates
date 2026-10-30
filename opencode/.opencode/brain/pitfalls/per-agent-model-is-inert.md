# Per-agent `model` works on the dispatch path, not the CLI path

Corrected 14 Oct 2026. An earlier version of this note claimed per-agent
`model` was inert. That was true only of `opencode run` and wrong for
subagent dispatch, which is the path that actually matters.

## Which path honours `agents.<id>.model`

| Path | Honours config `model`? |
|---|---|
| subagent dispatch (how WARROOM runs units) | **Yes** |
| `opencode run --agent <name>` | No — always uses the top-level `model` |

Test that settles it. Point an agent at `opencode/exo-free`, which is
deprecated and hard-fails:

```
"mason": { "model": "opencode/exo-free" }

# CLI path — silently IGNORES it, runs the session default:
$ opencode run --agent mason "say READY"
> mason · big-pickle        ← big-pickle, not exo-free

# subagent path — HONOURS it, fails exactly as configured:
$ dispatch mason
Subagent failed: Model exo-free has been deprecated.
```

**Do not test this with the CLI.** A CLI test showing the wrong model is not
proof the config is inert — it only proves the CLI ignores it. Use the
subagent path, and use a model that *fails*, because two working free models
are indistinguishable by success alone.

Markdown frontmatter `model:` was not honoured on either path. Config wins;
per-unit models *can* go in `opencode.jsonc` (see the dispatch path above), but
this template no longer tiers models per agent — every unit inherits the
session's selected model (top-level `model`). Tiering per agent is available
if you want it; this setup deliberately opts out so one line moves all
routing decisions at once.

## An unset `model` falls back to a PAID model, and you get 402

With no top-level `model`, opencode picked `openrouter/unbiased/pareto-26.9`.
On a zero-credit account every request returns:

```
provider.quota 402 — Insufficient credits. This account never purchased credits.
```

The session dies before the first token. It does not fall back to a free
model; it fails. Always pin the top-level `model` on a free-only account.

## There is no per-agent fallback, so "N models per agent" cannot exist

The `model` field takes a string or `{providerID, model}` — both scalar. No
array form. No `fallback`/`fallbacks` key: every `fallback` string in the
binary belongs to auto-install, Bun internals, TUI colours, or LSP states.
On a provider error the run prints one line and exits 1.

Spread *across agents* instead. That is the only resilience available.

## `providerID`/`model` object form parses cleanly

Both `"opencode/cat-jam-free"` and
`{"providerID":"opencode","model":"cat-jam-free"}` resolve to the same value.
A `cat-jam-free` entry also appears as a phantom *agent id* in
`opencode debug agents` — a harmless artifact of the slash in the model
string, not a sign the config applied. Verify with a real dispatch instead.