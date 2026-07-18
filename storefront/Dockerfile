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

COPY --from=builder /app/storefront/public ./public
COPY --from=builder /app/storefront/.next/standalone ./
COPY --from=builder /app/storefront/.next/static ./.next/static
COPY storefront/check-env-variables.js ./check-env-variables.js

EXPOSE 3000

CMD ["node", "server.js"]
