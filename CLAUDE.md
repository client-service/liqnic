# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Liqnic is a Nepal-based e-commerce store (liquor, IQOS, ZYN) built as a MedusaJS v2 monorepo with three packages:

- `backend/` — MedusaJS v2 API server (Node.js, TypeScript, PostgreSQL + Redis)
- `dashboard/` — Custom admin UI (Vite + React, forked from MedusaJS admin dashboard)
- `storefront/` — Customer-facing shop (Next.js 15, App Router, Tailwind CSS)

Production URLs: `api.liqnic.com`, `cms.liqnic.com`, `liqnic.com` — served via Traefik in Docker.

---

## Commands

### Backend (`cd backend`)

```bash
npm install --legacy-peer-deps   # required — avoids peer dependency conflicts
npm run dev                      # medusa develop (hot reload)
npm run build                    # medusa build
npm run seed                     # medusa exec ./src/scripts/seed.ts

npx medusa db:setup              # run migrations + seed on fresh DB
npx medusa user -e <email> -p <password>   # create admin user

# Tests
npm run test:unit                # unit tests
npm run test:integration:http    # HTTP integration tests (requires running DB)
npm run test:integration:modules # module integration tests

# OpenAPI spec generation
npx medusa-oas oas --out-dir .oas --type store   # or admin | combined
```

### Dashboard (`cd dashboard`)

```bash
npm install
npm run dev      # vite dev server
npm run build    # tsup + type generation
npm run lint     # eslint
npm run test     # vitest --run
npm run i18n:validate   # validate translation files
```

### Storefront (`cd storefront`)

```bash
npm install
npm run dev      # next dev --turbopack -p 8000
npm run build    # next build
npm run lint     # next lint
npm run analyze  # ANALYZE=true next build (bundle analysis)
```

---

## Environment Setup

- **Backend**: copy `backend/.env.template` → `backend/.env`
- **Storefront**: copy `storefront/.env.template` → `storefront/.env`

Key backend env vars: `DATABASE_URL`, `REDIS_URL`, `CACHE_REDIS_URL`, `EVENTS_REDIS_URL`, `LOCKING_REDIS_URL`, `STORE_CORS`, `ADMIN_CORS`, `AUTH_CORS`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `MEDUSA_SERVE_STATIC_URL`.

Key storefront env vars: `MEDUSA_BACKEND_URL` (default: `http://localhost:9000`), `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`, `NEXT_PUBLIC_DEFAULT_REGION` (default: `np`).

---

## Architecture

### Backend

Medusa's built-in admin is **disabled** (`admin.disable: true` in `medusa-config.ts`) in favor of the standalone `dashboard/` package.

**Infrastructure** (all production, configured in `medusa-config.ts`):
- Redis cache: `@medusajs/cache-redis` (`CACHE_REDIS_URL`)
- Redis event bus: `@medusajs/event-bus-redis` (`EVENTS_REDIS_URL`)
- Redis distributed locking: `@medusajs/locking-redis` (`LOCKING_REDIS_URL`) — required for multi-instance deployments
- DB pool: min 2 / max 20 connections, `statement_timeout` of 2.5s enforced at the Postgres driver level

**Custom modules** (in `src/modules/`):

| Module | Purpose |
|---|---|
| `loyalty/` | Points system — own MikroORM models, migrations, and service |
| `events/` | Custom events with admin + store API routes |
| `cod-payment/` | Cash-on-delivery payment provider (`identifier: "cod-payment"`) — auto-authorizes so orders ship before cash is collected |
| `qr-payment/` | QR-based payment provider (`identifier: "qr-payment"`) — manual authorization flow |
| `resend/` | Transactional email via Resend API — handles `order.placed` and password reset; email templates in `src/modules/resend/emails/` |

All payment providers extend `AbstractPaymentProvider`. All notification providers extend `AbstractNotificationProviderService`.

**Custom workflows** (in `src/workflows/`):
- `apply-loyalty-on-cart.ts` — converts loyalty points into a Medusa promotion and applies it to the cart
- `remove-loyalty-from-cart.ts` — removes loyalty promotions from the cart
- `handle-order-points.ts` — awards points after order completion
- `send-order-confirmation.ts` — triggers Resend email on order placement

Workflows follow the `createWorkflow` / `createStep` pattern with compensation (rollback) logic. Steps live in `src/workflows/steps/`.

**Subscribers** (`src/subscribers/`): `order-placed.ts` and `handle-reset.ts` listen to Medusa events and invoke the corresponding workflows.

**API routes** (`src/api/`):
- `admin/custom/` — custom admin-only endpoints
- `store/carts/` and `store/customers/` — custom store endpoints
- `src/api/middleware.ts` — per-route middleware

**Links** (`src/links/`): Medusa v2 module link definitions for cross-module relationships.

### Storefront

**Routing**: All pages live under `src/app/[countryCode]/(main)/` or `src/app/[countryCode]/(checkout)/`. The `[countryCode]` segment is resolved by `src/middleware.ts`, which maps requests to a Medusa region and redirects to the correct country prefix. The default region is `np` (Nepal) and is fast-pathed in middleware to skip the region API call.

**Data layer** (`src/lib/data/`): One file per domain (`cart.ts`, `products.ts`, `orders.ts`, etc.), each exporting async server-action functions that call the Medusa JS SDK. The SDK instance (`sdk`) is initialized in `src/lib/config.ts`.

**Modules** (`src/modules/`): Domain-scoped page-section components (e.g. `home/`, `cart/`, `checkout/`, `account/`, `products/`). These are Next.js rendering components, not backend modules.

**Custom UI components** (`src/components/`): Brand-specific React components — `navbar.tsx`, `AgeVerificationModal.tsx`, `liquor-showcase.tsx`, `promo-banner.tsx`, etc.

**Image optimization**: `next.config.js` enforces WebP-only, restricted device sizes (`[640, 1080, 1920]`), and 1-year cache TTL. Remote patterns allow `api.liqnic.com` and `api.dev.liqnic.com`.

### Dashboard

A fork of the official MedusaJS admin dashboard. Built with Vite + React + TypeScript. Routes are in `src/routes/` (one folder per resource: orders, products, customers, etc.). Uses `tsup` for library output alongside a Vite preview build.

---

## Deployment

The repo owns the deploy compose files under `deploy/` (currently `deploy/docker-compose.dev.yml`; a `deploy/docker-compose.prod.yml` is a planned follow-up) — CircleCI `scp`s the env-specific file to the server on every deploy, so the repo is the single source of truth and the server never drifts. Each service's image is pinned to an immutable `<env>-<git-sha>` tag (`BACKEND_VERSION`/`DASHBOARD_VERSION`/`STOREFRONT_VERSION`), written into a server-side `.env` alongside `REVALIDATE_SECRET` by the deploy job. All three services run with Traefik labels for HTTPS termination. Backend static file uploads are served from the `static/` directory via `MEDUSA_SERVE_STATIC_URL`. Backend secrets (DB, Redis, Resend) live in a server-managed `.env.backend` (`env_file:`), never committed. Redis is required for production — all four Redis env vars (`REDIS_URL`, `CACHE_REDIS_URL`, `EVENTS_REDIS_URL`, `LOCKING_REDIS_URL`) must be set.
