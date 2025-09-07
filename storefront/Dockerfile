# DEV
FROM node:22-alpine AS dev-target
ENV NODE_ENV=development

# Create directory named app to hold the application code inside the image
WORKDIR /app

# Add package.json and package-lock.json
COPY package*.json /tmp/

# CI and release builds should use npm ci to fully respect the lockfile.
# Local development may use npm install for opportunistic package updates.
ARG npm_install_command=ci
RUN cd /tmp && npm $npm_install_command

# Move installed node modules to app
RUN cp -a /tmp/node_modules /app

# Bundle app source
COPY . /app

# PORT ID inside docker container
EXPOSE 3000

# Build
FROM dev-target AS build-target
ENV NODE_ENV=production

# Use build tools, installed as development packages, to produce a release build.
RUN npm run build

# Reduce installed packages to production-only.
RUN npm prune --production

# PROD
FROM node:22-alpine AS prod-target
ENV NODE_ENV=production

WORKDIR /app

# Include only the release build and production packages.
COPY --from=build-target /app/node_modules /app/node_modules
COPY --from=build-target /app/.next /app/.next
COPY --from=build-target /app/package.json /app/package.json
COPY --from=build-target /app/public /app/public
COPY --from=build-target /app/next.config.js /app/next.config.js

# PORT ID inside docker container
EXPOSE 3000

CMD ["npm", "start"]