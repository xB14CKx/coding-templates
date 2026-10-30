# Profile — Go service

**Detect:** `go.mod`, `go.sum`, `main.go`.

## Where things live

Standard layout: `cmd/<name>/main.go` for entry points, `internal/` for private
packages, `pkg/` for importable ones. A flat root with package directories is
also common in small services.

## Check before writing

- **The Go version** in `go.mod`. Generics, `errors.Join`, `slices` and `maps`
  packages, and loop-variable semantics all changed at 1.18 and 1.22.
- **Context discipline.** Is `context.Context` the first parameter? Is anything
  stored in it that should not be?
- **Error wrapping.** `fmt.Errorf("%w", err)` versus `errors.New`. Check
  whether `errors.Is` / `errors.As` are actually used, or whether the codebase
  compares strings.
- **Dependency injection style** — constructor injection, interfaces declared at
  the consumer, or a framework.
- **Concurrency primitives in use** — `errgroup`, a worker pool, channels, or a
  mutex. Adding a second style to a codebase that has one is a net loss.

## Conventions worth recording

- Where interfaces are declared. Go convention is the consumer, not the
  provider — check whether this codebase follows it or does the opposite.
- Package boundaries: what each top-level package owns.
- Whether `internal/` is enforced or decorative.
- Test style: table-driven, testify, or plain.

## Commands

```sh
go build ./...
go vet ./...
golangci-lint run   # if configured
go test ./...
```

## Where units land

| Area | Unit |
|---|---|
| handlers, services, storage | `hammer` |
| goroutine, channel, or context changes | `hammer`, with a `examiner` review afterwards |
| interface or package-boundary changes | `cartographer` first |
| anything reachable from the network | `aegis` |

## Mistakes that recur here

- A goroutine with no cancellation path, outliving the request.
- `errgroup.Wait()` never called, so errors are dropped.
- `context` stored in a struct instead of passed.
- A nil interface holding a typed nil pointer — the classic Go nil check that
  passes when it should fail.
- Missing `defer` on a lock or a body close.
- Blocking on an unbuffered channel in a select with no default.
- `interface{}` where a concrete type would do, adding indirection for nothing.