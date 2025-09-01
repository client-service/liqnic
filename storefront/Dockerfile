# storefront/Dockerfile
FROM node:20-bullseye

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Accept env vars at build time
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

# Make them available during build
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

RUN npm run build

EXPOSE 8000
CMD ["npm", "run", "start"]
