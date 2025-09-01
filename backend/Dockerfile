FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (include dev for Medusa CLI)
RUN npm install --legacy-peer-deps

# Copy backend source
COPY . .

# Expose Medusa port
EXPOSE 9000

# Default command to start Medusa
CMD ["npx", "medusa", "start"]
