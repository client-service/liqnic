# storefront/Dockerfile
FROM node:20-bullseye

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# Next.js runs on 8000 (already in your docker-compose labels)
EXPOSE 8000

CMD ["npm", "run", "start"]
