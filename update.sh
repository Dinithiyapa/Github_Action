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

# Run the new containers with the environment variables from .env
docker run -d \
  -p 3000:3000 \
  --name buzbud-web-action \
  --env-file .env \
  yapadinithi/buzbud-web-action:v1.0.0

docker run -d \
  -p 4000:4000 \
  --name buzbud-api-action \
  --env-file .env \
  yapadinithi/buzbud-api-action:v1.0.0

docker run -d \
  -p 5432:5432 \
  --name buzbud-db-action \
  -e POSTGRES_USER=$POSTGRES_USER \
  -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  postgres:latest
