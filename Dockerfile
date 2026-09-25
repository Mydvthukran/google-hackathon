FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package*.json ./
# Copy workspace package files
COPY packages/core/package*.json ./packages/core/
COPY apps/api/package*.json ./apps/api/
COPY apps/web/package*.json ./apps/web/

# Install all dependencies (including devDependencies needed for build)
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the required packages
RUN npm run build --workspace=@clause-compass/core
RUN npm run build --workspace=@clause-compass/api

FROM node:20-alpine AS runner

WORKDIR /app

# Copy built artifacts and package files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/core/package*.json ./packages/core/
COPY --from=builder /app/packages/core/dist ./packages/core/dist
COPY --from=builder /app/apps/api/package*.json ./apps/api/
COPY --from=builder /app/apps/api/dist ./apps/api/dist

ENV NODE_ENV=production
ENV SERVE_HTTP=true
ENV PORT=3001
EXPOSE 3001

CMD ["npm", "run", "start", "--workspace=@clause-compass/api"]
