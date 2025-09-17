# Docker Deployment Guide

This guide explains how to deploy the maptile-preview application using Docker and nginx.

## Prerequisites

- Docker 20.10+
- Docker Compose 2.0+

## Quick Start

### Using Docker Compose (Recommended)

1. Build and run the container:
   ```bash
   docker-compose up --build
   ```

2. Access the application:
   - Open http://localhost in your browser (port 80)

### Using Docker directly

1. Build the image:
   ```bash
   docker build -t maptile-preview .
   ```

2. Run the container:
   ```bash
   docker run -p 80:80 --name maptile-preview maptile-preview
   ```

## Configuration

### Environment Variables

- `NGINX_HOST`: Hostname (default: localhost)
- `NGINX_PORT`: Port number (default: 80)

### Custom Configuration

For custom nginx configuration, modify `nginx.conf` before building the image.

## Production Deployment

### Health Checks

The container includes health checks that monitor the application status:
- Health endpoint: http://localhost:8080/health
- Checks every 30 seconds with 3 retries

### Performance Optimizations

The nginx configuration includes:
- Gzip compression for static assets
- Long-term caching for CSS/JS files (1 year)
- Short-term caching for JSON files (1 hour)
- Security headers (XSS protection, CSRF protection, etc.)
- Client-side routing support for SPA

### Security Features

- Non-root user (nginx:nginx)
- Security headers
- Hidden file access denied
- Proper file permissions

## Monitoring

### Logs

View container logs:
```bash
docker logs maptile-preview
```

### Health Status

Check container health:
```bash
docker inspect --format='{{.State.Health.Status}}' maptile-preview
```

Or test directly:
```bash
curl http://localhost/health
```

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the port in docker-compose.yml
2. **Build failures**: Ensure all dependencies are installed locally first
3. **Permission issues**: Check file permissions in dist folder

### Debug Mode

For debugging, run with verbose logging:
```bash
docker-compose up --build --verbose
```

## Maintenance

### Updating the Application

1. Rebuild the image:
   ```bash
   docker-compose down
   docker-compose build --no-cache
   docker-compose up -d
   ```

### Backup

Backup your custom nginx configuration:
```bash
cp nginx.conf nginx.conf.backup
```

## Development

### Local Development with Docker

For development with hot reload (not recommended for this static build):
```bash
# Use a separate docker-compose.dev.yml for development
```

### Building for Different Environments

```bash
# Production build
docker build -t maptile-preview:latest .

# Development build
docker build -t maptile-preview:dev .
```