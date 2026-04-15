# ==========================================
# STAGE 1: BUILDER
# ==========================================
FROM node:22-alpine3.23 AS builder

# Medusa requires Python and build tools for certain native dependencies (like bcrypt/sqlite)
RUN apk add --no-cache python3 make g++ 

WORKDIR /app

# 1. Copy the ROOT lockfile and Yarn configs
RUN corepack enable
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

# 2. Copy the workspace package.json files
COPY backend/package.json ./backend/
COPY dashboard/package.json ./dashboard/
COPY storefront/package.json ./storefront/

# 3. Install ALL dependencies in the builder stage to access root TypeScript
RUN yarn install --immutable

# 4. Copy the Backend source code
COPY backend ./backend

# 5. Build the Medusa backend
WORKDIR /app/backend
RUN yarn build

# ==========================================
# STAGE 2: RUNNER (Production Image)
# ==========================================
FROM node:22-alpine3.23 AS runner
WORKDIR /app/backend

# Allocate extra memory for Node as requested in your original Dockerfile
ENV NODE_OPTIONS=--max-old-space-size=4096
ENV NODE_ENV=production

# We copy the entire built backend directory from the builder
COPY --from=builder /app/backend/package.json ./
COPY --from=builder /app/backend/.medusa/server ./
COPY --from=builder /app/node_modules ../node_modules

EXPOSE 9000

# Start the Medusa server
CMD ["yarn", "start"]