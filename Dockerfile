# WCIRIA Backend - Multi-stage build for Node.js/TypeScript

FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY backend/package*.json ./
RUN npm ci

# Copy source code
COPY backend/src ./src
COPY backend/tsconfig.json ./

# Build TypeScript
RUN npm run build

# ============================================================================
# Production stage
# ============================================================================

FROM node:20-alpine

WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache postgresql-client

# Copy package files
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy built application
COPY --from=builder /app/dist ./dist

# Copy database scripts
COPY backend/src/database ./dist/database

# Expose API port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Environment configuration
ENV NODE_ENV=production
ENV LOG_LEVEL=info
ENV PORT=3001
ENV HOST=0.0.0.0
ENV DATABASE_URL=postgresql://wciria:password@postgres:5432/wciria_db

# Start application
CMD ["node", "dist/server.js"]
