# Docker Setup Guide

This project is containerized using Docker with Alpine Linux for a lightweight footprint.

## Quick Start

### Build and Run with Docker Compose (Recommended)
```bash
docker-compose up --build
```

Then open http://localhost:3000 in your browser.

### Build and Run with Docker Only
```bash
# Build the image
docker build -t bootcamp-app .

# Run the container
docker run -p 3000:3000 bootcamp-app
```

## Stopping the Container

### With Docker Compose
```bash
docker-compose down
```

### With Docker Only
```bash
docker stop <container-id>
docker rm <container-id>
```

## Additional Commands

### View running containers
```bash
docker ps
```

### View all containers (including stopped)
```bash
docker ps -a
```

### View container logs
```bash
docker logs bootcamp-app
```

### Remove the image
```bash
docker rmi bootcamp-app
```

## Image Size

- **Base Layer**: Alpine Linux (~5MB)
- **Total Image**: ~150-200MB (compressed)

This is significantly smaller than using Ubuntu or Debian-based images (~1-2GB).

## Configuration

- **Port**: 3000 (can be changed in docker-compose.yml)
- **Environment**: Production
- **Auto-restart**: Enabled (unless stopped manually)
- **Health checks**: Enabled with 30s interval

## Notes

- The image uses a multi-stage build to keep final size minimal
- Build dependencies are discarded after compilation
- Node.js v18 Alpine is used for optimal performance and security
- The `serve` package is used for efficient static file serving
