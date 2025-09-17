# Stage 1: Build the React application
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:preview

# Reduce installed packages to production-only.
RUN npm prune --production

# Stage 2: Serve the built application with Nginx
FROM nginx:alpine

# Copy the Vite build output to Nginx's root directory
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]