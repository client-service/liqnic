# Stage 1: Build the React application
FROM node:22-alpine AS build

WORKDIR /app

RUN corepack enable

# Monorepo root files — layer invalidates only when lockfile changes
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc ./

# Dashboard package manifest
COPY dashboard/package.json ./dashboard/

# Install dashboard dependencies only
RUN pnpm install --filter=@medusajs/dashboard --frozen-lockfile

# Dashboard source
COPY dashboard/ ./dashboard/

# Accept and inject Vite-specific build arguments
ARG VITE_MEDUSA_BACKEND_URL
ARG VITE_MEDUSA_BASE
ARG VITE_MEDUSA_STOREFRONT_URL

ENV VITE_MEDUSA_BACKEND_URL=$VITE_MEDUSA_BACKEND_URL
ENV VITE_MEDUSA_BASE=$VITE_MEDUSA_BASE
ENV VITE_MEDUSA_STOREFRONT_URL=$VITE_MEDUSA_STOREFRONT_URL

RUN pnpm --filter=@medusajs/dashboard run build:preview

# Stage 2: Serve the built application with Nginx
FROM nginx:alpine

# Copy the Vite build output to Nginx's root directory
COPY --from=build /app/dashboard/dist /usr/share/nginx/html

# Copy custom nginx config
COPY dashboard/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
