# Base stage with Node.js
FROM node:24.10.0-slim AS base
# Enable Corepack for automatic pnpm installation
RUN corepack enable
# Set pnpm store location
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Build stage
FROM base AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Install all dependencies (including devDependencies) with cache mount
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile
# Copy source code and build
COPY . .
RUN pnpm build

# Final production stage with nginx
FROM nginx:1.29.2-alpine AS runtime

# Copy built application from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]