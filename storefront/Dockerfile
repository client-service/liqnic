# ==========================================
# STAGE 1: BUILDER
# ==========================================
FROM node:24-alpine AS builder
WORKDIR /app

# 1. Enable Corepack and copy the ROOT lockfile and configs
RUN corepack enable
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

# 2. Copy ONLY the workspace package.json files (to preserve Docker cache)
COPY storefront/package.json ./storefront/
COPY backend/package.json ./backend/
COPY dashboard/package.json ./dashboard/

# 3. Install ALL dependencies to access root TypeScript
RUN yarn install --immutable

# 4. Copy the actual Storefront source code
COPY storefront ./storefront

# 5. Build the Storefront
WORKDIR /app/storefront
# Pass Next.js environment variables here if needed
RUN yarn build

# ==========================================
# STAGE 2: RUNNER (Production Image)
# ==========================================
FROM node:24-alpine AS runner
WORKDIR /app

# Copy the built output from the builder stage
COPY --from=builder /app/storefront/public ./public
COPY --from=builder /app/storefront/.next/standalone ./
COPY --from=builder /app/storefront/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000

# Start the standalone Next.js server
CMD ["node", "server.js"]