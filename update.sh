#!/bin/bash

# Ensure we're in the correct directory
SCRIPT_DIR=$(dirname "$0")
cd "$SCRIPT_DIR" || { echo "Failed to navigate to the script's directory"; exit 1; }

# Check if docker-compose.yml exists
if [[ ! -f "docker-compose.yml" ]]; then
    echo "docker-compose.yml not found in the current directory"
    exit 1
fi

# Pull the latest Docker images
docker-compose pull

# Rebuild and restart the containers
docker-compose up -d --build

# Clean up unused images
docker image prune -f

# Check the container status
docker-compose ps

echo "Deployment complete!"
