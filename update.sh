#!/bin/bash

# Navigate to the directory where your docker-compose.yml file is located
cd /path/to/your/project

# Pull the latest Docker images
docker-compose pull

# Rebuild and restart the containers with the latest images
docker-compose up -d --build

# Optionally, remove old unused Docker images
docker image prune -f

# Optionally, check the status of the containers to verify if everything is running fine
docker-compose ps

echo "Deployment complete!"
