# Profile — Infrastructure

**Detect:** `*.tf` / `*.tfvars`, `Dockerfile`, `docker-compose.yml`,
`k8s/`, `helm/`, `.github/workflows/`, `Makefile` with `deploy` targets,
`ansible/`, `serverless.yml`, `Pulumi.yaml`.

## Where things live

| Kind | Signal |
|---|---|
| Terraform | `main.tf`, `variables.tf`, `outputs.tf`, `*.tfvars` |
| Docker | `Dockerfile`, `.dockerignore`, `docker-compose.yml` |
| Kubernetes | `k8s/`, `helm/`, `Chart.yaml`, `*deployment*.yaml` |
| CI | `.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile` |
| Ansible | `playbooks/`, `inventory/` |

## The dominant risk

**This profile changes real systems.** Infrastructure edits are not reversible
with a `git revert` once applied. Default to the safe path:

- Plan before apply. If the tool has a `plan`/`diff`/`validate` command, run it
  and show the output.
- Never apply. This template's policies block state mutation; keep it that way.
- State-changing commands require explicit user instruction in the prompt, every
  time. A previous approval is not a standing approval.
- When a change can destroy data, say so in plain words before making it, and
  confirm what the user wants.

## Check before writing

- **State backend and locking.** Concurrent applies are how infrastructure is
  corrupted.
- **Is this declarative or imperative?** Mixing the two produces drift.
- **Variable wiring** — how does a value get from a variable to the resource,
  and what is its default? A default that is wrong for production is a hazard.
- **Pinned versions.** Image tags, provider versions, module versions. A mutable
  tag means the same code deploys differently next week. Pin by digest where
  the tooling supports it.
- **Secrets handling** — how are they injected, never stored in state in plain
  text, never printed by a plan.
- **What the CI actually deploys** and on what trigger. A workflow that deploys
  on merge to main is worth knowing before you touch it.

## Commands

```sh
terraform fmt -check
terraform validate
terraform plan          # safe; shows the diff without applying
docker build .
```

## Where units land

| Area | Unit |
|---|---|
| any change | `cartographer` first for anything state-changing or hard to reverse |
| Dockerfile, CI, compose | `hammer` |
| anything with network exposure, IAM, or secrets | `aegis` |
| cost, scaling, availability trade-offs | `cartographer` |

## Mistakes that recur here

- A mutable image tag in a production manifest.
- A secret committed to a `.tfvars` file — note that `.tfvars` is frequently
  **not** gitignored by default, and Terraform state contains secrets in plain
  text unless configured otherwise.
- Running `apply` as part of "verifying" a change.
- A security group open to `0.0.0.0/0` added to make something work.
- A resource replacement that destroys and recreates rather than updates.
- Editing by hand what the tool generates — the next apply reverts it.
- No health check, no readiness probe, no rollback path.