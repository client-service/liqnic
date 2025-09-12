# Development Dockerfile for Medusa
FROM node:22-alpine

# Set working directory
WORKDIR /server

# Copy package files and yarn config
COPY package.json yarn.lock .yarnrc.yml ./

# Install all dependencies using yarn
RUN yarn install --production

# Copy source code
COPY . .

# Expose the port Medusa runs on
EXPOSE 9000

# Build the medusajs application
RUN yarn build
