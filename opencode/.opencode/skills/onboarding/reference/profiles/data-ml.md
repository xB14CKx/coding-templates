# Profile — Data / ML

**Detect:** `notebooks/`, `*.ipynb`, `dvc.yaml`, `mlruns/`, `data/` with
`*.parquet`, `train.py`, `preprocess.py`, a `Makefile` with data targets, or a
scheduler config (Airflow, Prefect, Dagster).

## Where things live

| Kind | Signal |
|---|---|
| Notebooks | `*.ipynb` — usually exploration, often committed by accident |
| Pipelines | `dags/`, `pipelines/`, `airflow/dags/` |
| Features / datasets | `features/`, `data/`, a registry client in the manifest |
| Training | `train.py`, `configs/`, `checkpoints/`, `runs/` |
| Serving | `serve.py`, `predict.py`, `api/` |

## Check before writing

- **Where the data lives and what it costs to read.** Do not load a dataset into
  a notebook to look at five rows.
- **Is data versioned?** DVC, a lake, or loose files. If it is loose, treat every
  result as unreproducible and say so.
- **Randomness.** Seed handling, and whether seeds are recorded with each run.
- **Train/validation/test boundaries.** The first real bug in ML is leakage.
- **Config over constants** — Hydra, argparse, a YAML file, or constants inline.
  If constants are inline, that is the thing to fix before adding a parameter.
- **Experiment tracking** — MLflow, W&B, TensorBoard. Note it; do not silently
  introduce a second tracker.

## Hard rules for this profile

- **A notebook is not a deliverable.** If the change matters, it belongs in an
  importable module that the notebook calls. Do not put production logic in a
  `.ipynb`.
- **Never commit a dataset.** Add it to `.gitignore` and record how to obtain it.
- **Never commit model weights over a size threshold** the project has already
  set. Check for an existing ignore rule before producing a large file.
- **Report the metric, with the split it was measured on.** A number without its
  split is meaningless, and reporting a train score as a test score is the most
  damaging mistake in this profile.
- **A result you did not re-run is not a result.** Say which run produced it.

## Where units land

| Area | Unit |
|---|---|
| pipeline and transform code | `hammer` |
| experiment design, metric choice, leakage | `cartographer` |
| a failing or unexplained result | `examiner` |
| serving an endpoint, exposing predictions | `hammer`, with `aegis` — it is now an API |

## Commands

Read from the `Makefile` and the pipeline config. A data project usually has
`make data`, `make train`, `make eval` — and its `make test` may run almost
nothing, so verify what the target actually does before trusting a green run.