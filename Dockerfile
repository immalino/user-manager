# Use the official Bun image as base
FROM oven/bun:1.1.34-alpine AS base

# Install Node.js for client build process
RUN apk add --no-cache nodejs npm

WORKDIR /app

# Copy package files for dependency installation
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies for both client and server
RUN cd client && npm install
RUN cd server && bun install

# Copy source code
COPY . .

# Build stage
FROM base AS builder

WORKDIR /app

# Build the client application
RUN cd client && npm run build

# Copy built client files to server static directory
RUN cp -r client/dist/ server/static/ 2>/dev/null || mkdir -p server/static

# Build server

RUN cd server && bun run db:push && bun run build

# Production stage
FROM oven/bun:1.1.34-alpine AS production

# Install curl for healthcheck
RUN apk add --no-cache curl

WORKDIR /app

# Copy only necessary files from builder stage
COPY --from=builder /app/server/index.js ./
COPY --from=builder /app/server/static ./static

# Expose the port
EXPOSE 9999

# Start the application
CMD ["bun", "index.js"]