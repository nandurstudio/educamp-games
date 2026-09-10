# Multi-stage Dockerfile untuk GCP Cloud Run
FROM node:20-alpine AS runner

WORKDIR /app

# Copy dependency definition
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy seluruh source code
COPY . .

# Expose port (Cloud Run menyetel ENV PORT=8080 secara dinamis)
ENV PORT=8080
ENV NODE_ENV=production
EXPOSE 8080

CMD ["node", "src/server/app.js"]
