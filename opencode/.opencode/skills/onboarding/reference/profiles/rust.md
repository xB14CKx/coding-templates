# Profile — Rust

**Detect:** `Cargo.toml`, `Cargo.lock`.

## Where things live

`src/main.rs` or `src/lib.rs` as the crate root, `src/<module>.rs` for modules,
`benches/`, `tests/` for integration tests, `examples/`, `build.rs` for build
scripts, `xtask` for task automation.

## Check before writing

- **Edition and MSRV** in `Cargo.toml`. Edition 2024 changed match ergonomics,
  `unsafe` attribute rules, and temporary lifetime rules.
- **Error handling in this crate.** `anyhow` for applications, `thiserror` for
  libraries, or a hand-rolled `Error` enum. Mixing them is a review finding.
- **Async runtime** — Tokio, async-std, or none. Do not introduce a second.
- **Feature flags and no-default-features.** What does the default build include,
  and does CI test the minimal feature set?
- **Unsafe code** — is it permitted, and is there a documented invariant for
  each block? An unexplained `unsafe` block is an unconditional finding.
- **Lockfile policy** — is `Cargo.lock` committed? For a library, usually not; for
  a binary, always.

## Commands

```sh
cargo build
cargo clippy --all-targets
cargo fmt --check
cargo test
```

## Where units land

| Area | Unit |
|---|---|
| any implementation | `hammer` |
| lifetimes, borrow-checker fights, unsafe | `cartographer` or `examiner` before writing |
| public API surface | `cartographer` — it is a contract |
| unsafe, parsing, crypto | `aegis` |

## Mistakes that recur here

- `unwrap()` in a path that can actually fail. In tests it is fine.
- A `Mutex` held across an `.await`, which is why `tokio::sync::Mutex` exists.
- Cloning to satisfy the borrow checker instead of restructuring.
- Adding a dependency for something the standard library does.
- A breaking change to a public API with no deprecation path.
- Silently ignoring a `Result` with `let _ =`, losing the error.