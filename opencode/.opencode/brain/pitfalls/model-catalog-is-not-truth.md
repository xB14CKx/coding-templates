# The model catalog lies in three specific ways

Every one of these cost me a wrong call before a benchmark caught them.
Check `models` output against a live call before trusting it.

## 1. `status: "active"` does not mean the model works

`opencode/exo-free` is listed `active` and has variants. It returns
HTTP 410 `ModelDeprecated`. It is dead. Availability must be proven by a
real call, never read off the catalog.

## 2. A model with no `-free` suffix can still be free

`opencode/big-pickle` has no suffix and breaks the naming convention, but
is priced `0/0/0` and runs fine. Conversely the suffix is not a guarantee
of quality. Trust the `cost` field, and confirm the provider populates
real prices when they exist — in the `opencode` provider, `gemini-4-argon`
sits at $2/$10, so a genuine `0/0/0` next to it means free, not missing data.

Do **not** infer from display names. The console strips suffixes: "Cat Jam",
"Exo", "Space Bunny" — none of them say "Free", including the free ones.

## 3. `variants: []` is a hard config error, not a no-op

An unknown variant is a model-resolution error and the agent fails to
start. Six free models have no variants at all, so `#high` on them breaks
the unit rather than degrading it.

## 4. `#high` can make accuracy worse

Measured, 3 trials: `cat-jam-free` scored 4.33, `cat-jam-free#high` scored
3.67 on the same task. Do not assume a higher reasoning variant is better.
Benchmark before adding one.

## 5. `models` paginates silently

`models({ limit: 100 })` returned 133 of 426 and reported `total: 133`.
`all: true` returns the full 426. The default view hides most of the
catalogue, including the free OpenRouter models. I gave the user "4 free
models" when there were 14.

## 6. Never score a benchmark you have not executed

I asserted BANANA had 10 distinct arrangements. It has 60 — every model
was right and I was wrong. Run the ground truth. Same class of error on a
Python default-argument item: `def f(a, b=a)` is a `NameError` at module
scope, so the test itself was invalid.