# Deploy server layout

Each environment (`dev`, `prod`) lives at `/home/docker/liqnic/<env>/` on the deploy server. Three files sit
in that directory; all three are required for `docker compose` to bring up backend + dashboard + storefront.

| File | Owner | How it gets there |
|---|---|---|
| `docker-compose.yml` | CI | `scp`'d from `deploy/docker-compose.<env>.yml` on every deploy of any service (`deploy-backend` / `deploy-dashboard` / `deploy-storefront` in `.circleci/continue_config.yml`). Repo is the source of truth — never hand-edit this on the server, it gets overwritten on the next deploy. |
| `.env` | CI | Auto-created (`touch .env`) and incrementally updated by each service's deploy job — see below. Never hand-edit `BACKEND_VERSION`/`DASHBOARD_VERSION`/`STOREFRONT_VERSION`/`REVALIDATE_SECRET` here, the next deploy of that service overwrites them. |
| `.env.backend` | **Server only** | Not touched by CI at all. Must be created and populated by hand on any fresh server (see "Backend secrets" below). |

If either `.env` or `.env.backend` is missing, `docker compose up` will fail (unset interpolation variable / missing
`env_file`). If `docker-compose.yml` is missing, the first deploy for that environment falls back to whatever
compose file already exists on the server (`deploy-*` jobs check `[ -f deploy/docker-compose.$ENV_TAG.yml ]`
before scp'ing — currently only `docker-compose.dev.yml` exists in the repo, so `production` deploys still rely
on a server-resident compose file until `deploy/docker-compose.prod.yml` is added).

## How env vars get populated, per service

### Backend
- **Runtime config** (DB, Redis, CORS, JWT/cookie secrets, SMTP, Resend) — entirely from `.env.backend` via
  `env_file:` in the compose service definition. Server-managed, CI never touches it. To change: edit
  `.env.backend` directly, then `docker compose up -d --force-recreate backend` (editing the file alone doesn't
  restart the container or re-read it).
- **Version tag** — `BACKEND_VERSION` in `.env`, written by `deploy-backend`'s script (computed as
  `<dev|prod>-<git-sha:7>` at deploy time, not sourced from a CircleCI context).
- No build-time env vars — the backend image just runs compiled TypeScript; no secrets are baked into the image.

### Dashboard
- **Build-time only** — `VITE_MEDUSA_BACKEND_URL`, `VITE_MEDUSA_BASE`, `VITE_MEDUSA_STOREFRONT_URL` are passed
  as `--build-arg`s in `docker-publish-dashboard` (from context vars `MEDUSA_BACKEND_URL`, `VITE_MEDUSA_BASE`,
  `NEXT_PUBLIC_BASE_URL` respectively), sourced from the CircleCI `liqnic-dev`/`liqnic-prod` context matching
  the branch (`*-workflow-dev` vs `*-workflow-prod`, see `fix/ci-context-branch-isolation`). Vite inlines these
  into the built JS bundle — **changing one of these requires a rebuild**, not just a redeploy.
- No runtime env vars at all — the compose service has no `environment:` block.
- **Version tag** — `DASHBOARD_VERSION` in `.env`, same pattern as backend.

### Storefront
- **Build-time** — `MEDUSA_BACKEND_URL`, `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`, `NEXT_PUBLIC_BASE_URL` are written
  to a repo-root `.env` file inside the CI job (`build-test-storefront` / `docker-publish-storefront`), read by
  `next build`, and baked into the Next.js standalone output. Sourced from the matching branch's CircleCI
  context. Also requires a rebuild to change.
- **Runtime** — two vars in the compose service's `environment:` block:
  - `MEDUSA_BACKEND_URL` is hardcoded to the internal Docker DNS name (`http://liqnic-backend-dev:9000`) — not
    from any env file, doesn't need CI or context.
  - `REVALIDATE_SECRET` is interpolated from server `.env`, written by `deploy-storefront`'s script from the
    CircleCI context every deploy.
- **Version tag** — `STOREFRONT_VERSION` in `.env`, same pattern as backend/dashboard.

## Restarting after a manual `.env` / `.env.backend` edit

Editing `.env` or `.env.backend` directly on the server does **not** take effect on its own — Docker bakes
`env_file`/`environment` values in at container *creation*, not at container start, and `docker compose restart`
reuses the existing container (and its already-baked-in env) rather than reading the file again. Recreate the
container instead. A helper script is shipped alongside `docker-compose.yml` on every deploy (CI `scp`s
`deploy/restart.sh` to the same directory, regardless of which service deployed):

```bash
cd /home/docker/liqnic/<env>
bash restart.sh backend        # or dashboard / storefront / all
```

This only helps for values read at **runtime** (backend's `.env.backend`, storefront's `REVALIDATE_SECRET`) —
per the build-time vars listed above (dashboard's `VITE_*` args, storefront's `NEXT_PUBLIC_*`/
`MEDUSA_BACKEND_URL` baked at build time), a restart changes nothing; those need an actual rebuild (push a
commit, or re-run the CircleCI workflow).

## Summary

- **3 files** needed per environment: `docker-compose.yml` (CI-shipped), `.env` (CI-populated), `.env.backend`
  (server-only, manual).
- **Build-time vs runtime** matters: dashboard and storefront's API URLs/keys are baked in at Docker build time
  from the CircleCI context — redeploying with a new context value does nothing until the image is rebuilt.
  Only backend config (via `.env.backend`) and storefront's `REVALIDATE_SECRET` are read at container start,
  so those are the only two things a plain redeploy (no rebuild) can actually change.
