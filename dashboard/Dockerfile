# ==========================================
# STAGE 1: BUILDER
# ==========================================
FROM node:22-alpine3.23 AS builder
WORKDIR /app

# 1. Copy the ROOT lockfile and Yarn configs
RUN corepack enable
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

# 2. Copy workspace package.json files
COPY backend/package.json ./backend/
COPY dashboard/package.json ./dashboard/
COPY storefront/package.json ./storefront/

# 3. Install ONLY dashboard dependencies
RUN yarn workspaces focus @medusajs/dashboard

# 4. Copy Dashboard source code
COPY dashboard ./dashboard

# 5. Build the Vite Dashboard
WORKDIR /app/dashboard
# Pass build-time args for Medusa URLs
ARG VITE_MEDUSA_BACKEND_URL
ARG VITE_MEDUSA_BASE
ARG VITE_MEDUSA_STOREFRONT_URL
ENV VITE_MEDUSA_BACKEND_URL=$VITE_MEDUSA_BACKEND_URL
ENV VITE_MEDUSA_BASE=$VITE_MEDUSA_BASE
ENV VITE_MEDUSA_STOREFRONT_URL=$VITE_MEDUSA_STOREFRONT_URL

RUN yarn build

# ==========================================
# STAGE 2: RUNNER (Nginx)
# ==========================================
FROM nginx:alpine AS runner

# Copy the built Vite static assets to Nginx
COPY --from=builder /app/dashboard/dist /usr/share/nginx/html

# Expose port 80 (Traefik will route to this)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]