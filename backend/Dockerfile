FROM node:22-alpine
ENV NODE_OPTIONS=--max-old-space-size=4096

WORKDIR /app

RUN corepack enable

# Monorepo root files — layer invalidates only when lockfile changes
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc ./

# Backend package manifest
COPY backend/package.json ./backend/

# Install backend dependencies only
RUN pnpm install --filter=backend --frozen-lockfile

# Backend source
COPY backend/ ./backend/

EXPOSE 9000

RUN pnpm --filter=backend run build

CMD ["pnpm", "--filter=backend", "start"]
