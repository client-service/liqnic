# dashboard/Dockerfile
FROM node:20-bullseye

WORKDIR /app

# Copy dependency files first (better for caching)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy project files
COPY . .

# Build the dashboard
RUN npm run build

# Expose the Vite preview port
EXPOSE 3000

# Start the dashboard with vite preview
CMD ["npm", "run", "start"]
