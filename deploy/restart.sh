#!/usr/bin/env bash
# Recreate service containers to pick up changes to .env / .env.backend.
# Editing those files alone does not restart or re-read them -- Docker bakes
# env_file / environment values in at container creation, not at container
# start. `docker compose restart` reuses the existing container and its
# already-baked-in env, so it will NOT pick up the edit; this script forces
# recreation instead.
#
# Run from the environment's deploy directory (where docker-compose.yml,
# .env, and .env.backend live), e.g.:
#   cd /home/docker/liqnic/dev && bash restart.sh backend
set -euo pipefail

usage() {
  echo "Usage: $0 <backend|dashboard|storefront|all>"
  exit 1
}

[ $# -eq 1 ] || usage

case "$1" in
  backend|dashboard|storefront)
    echo "==> Recreating $1..."
    docker compose up -d --force-recreate "$1"
    ;;
  all)
    echo "==> Recreating backend, dashboard, storefront..."
    docker compose up -d --force-recreate backend dashboard storefront
    ;;
  *)
    usage
    ;;
esac

echo "==> Done. Current status:"
docker compose ps
