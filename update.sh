#!/bin/bash

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
docker pull postgres:latest

# Run the new containers with the correct port mapping and environment variables

# Run the web container
docker run -d \
  -p 3000:3000 \
  --name buzbud-web-action \
  --env API_URL=http://172.235.1.190:4000 \
  yapadinithi/buzbud-web-action:v1.0.0

# Run the API container
docker run -d \
  -p 4000:4000 \
  --name buzbud-api-action \
  --env API_DB=postgres://user1:password1@172.235.1.190:5432/busbud_db \
  --env API_URL=http://172.235.1.190:4000 \
  yapadinithi/buzbud-api-action:v1.0.0

# Run the database container
docker run -d \
  -p 5432:5432 \
  --name buzbud-db-action \
  -e POSTGRES_USER=user1 \
  -e POSTGRES_PASSWORD=password1 \
  postgres:latest
