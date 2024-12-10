GNU nano 6.2                 update.sh                          

#!/bin/bash

# Load environment variables from the .env file
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo ".env file not found! Exiting..."
  exit 1
fi

# Stop the currently running containers
docker stop buzbud-web-action
docker stop buzbud-api-action
docker stop buzbud-db-action

# Remove the stopped containers
docker rm buzbud-web-action
docker rm buzbud-api-action
docker rm buzbud-db-action

# Pull the latest Docker images
docker pull yapadinithi/buzbud-web-action:v1.0.0
docker pull yapadinithi/buzbud-api-action:v1.0.0
docker pull postgres:latest  # Pull the latest PostgreSQL image

# Run the PostgreSQL database container with environment variables from .env
docker run -d \
  --name buzbud-db-action \
  --env-file .env \
  -v buzbud-db-data:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:latest

# Run the web container
docker run -d -p 3000:3000 --name buzbud-web-action yapadinithi/buzbud-web-action:v1.0.0

# Run the API container linked to the database container
docker run -d \
  -p 4000:4000 \
  --name buzbud-api-action \
  --link buzbud-db-action:db \
  yapadinithi/buzbud-api-action:v1.0.0
