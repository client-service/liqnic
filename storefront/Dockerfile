# Stage 1: Install + Build
FROM node:22-alpine AS builder
ENV NODE_ENV=production
ENV SHARP_CONCURRENCY=1

WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN corepack enable

# Monorepo root files — layer invalidates only when lockfile changes
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc ./

# Storefront package manifest
COPY storefront/package.json ./storefront/

# Install storefront dependencies only
RUN pnpm install --filter=medusa-next --frozen-lockfile

# .env is written by CI to the repo root before docker build
COPY .env ./storefront/.env

# Storefront source
COPY storefront/ ./storefront/

RUN pnpm --filter=medusa-next run build

# Stage 2: Production (Next.js standalone)
FROM node:22-alpine AS runner
ENV NODE_ENV=production
ENV SHARP_CONCURRENCY=1
ENV NODE_OPTIONS=--max-old-space-size=2048

WORKDIR /app

# .next/standalone contains BOTH the hoisted pnpm-store node_modules (flat, at
# repo-root-relative position) AND the app itself nested at its workspace-relative
# path (storefront/server.js, storefront/node_modules/next -> relative symlink into
# the hoisted store). Copying it as a whole preserves that relationship — do not
# flatten storefront/* into the runner root, the relative symlinks depend on the
# sibling layout.
COPY --from=builder /app/storefront/.next/standalone ./
COPY --from=builder /app/storefront/.next/static ./storefront/.next/static
COPY --from=builder /app/storefront/public ./storefront/public
COPY storefront/check-env-variables.js ./storefront/check-env-variables.js

EXPOSE 3000

CMD ["node", "storefront/server.js"]
