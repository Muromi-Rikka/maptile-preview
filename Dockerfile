# Base stage with Node.js
FROM node:24-slim AS base
# Enable Corepack for automatic pnpm installation
RUN corepack enable
# Set pnpm store location
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Production dependencies stage
FROM base AS prod-deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# Use cache mount for pnpm store and install only production dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --prod --frozen-lockfile

# Build stage
FROM base AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# Install all dependencies (including devDependencies) with cache mount
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile
# Copy source code and build
COPY . .
RUN pnpm build

# Final production stage with nginx
FROM nginx:1.29.1-alpine AS runtime

# Copy production dependencies from prod-deps stage
COPY --from=prod-deps /app/node_modules /usr/share/nginx/html/node_modules

# Copy built application from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create a non-root user to run nginx
RUN addgroup -g 1001 -S nginx && \
    adduser -S -D -H -u 1001 -h /var/cache/nginx -s /sbin/nologin -G nginx -g nginx nginx

# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d

# Switch to non-root user
USER nginx

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]