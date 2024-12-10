GNU nano 6.2                 update.sh                          #!/bin/bash

# Stop the currently running containers
docker stop buzbud-web-action
docker stop buzbud-api-action

# Remove the stopped containers
docker rm buzbud-web-action
docker rm buzbud-api-action

# Pull the latest Docker images
docker pull yapadinithi/buzbud-web-action:v1.0.0
docker pull yapadinithi/buzbud-api-action:v1.0.0

# Run the new containers with the correct port mapping
docker run -d -p 3000:3000 --name buzbud-web-action yapadinithi/b>docker run -d -p 4000:4000 --name buzbud-api-action yapadinithi/b>
