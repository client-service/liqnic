FROM node:20-bullseye

# Set working directory
WORKDIR /app

# Accept build args from CircleCI
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ARG MEDUSA_BACKEND_URL

# Expose them as environment variables inside container
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ENV MEDUSA_BACKEND_URL=$MEDUSA_BACKEND_URL

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy rest of the project
COPY . .

# Run build with correct backend values
RUN npm run build

# Expose port (Next.js default is 3000, change if needed)
EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]
