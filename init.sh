#!/usr/bin/env bash

set -e

# Reset
off='\033[0m'       # Text Reset

# Regular Colors
black='\033[0;30m'        # Black
red='\033[0;31m'          # Red
green='\033[0;32m'        # Green
yellow='\033[0;33m'       # Yellow
blue='\033[0;34m'         # Blue
purple='\033[0;35m'       # Purple
cyan='\033[0;36m'         # Cyan
white='\033[0;37m'        # White

printf "


${blue}test-fullstack NestJS/React Init Script${off}
Version: 0.0.1
Author: ${green}Stefan Wawrzyn <swawrzyn@gmail.com>${off}
"

if ! [ -x "$(command -v docker)" ]; then
    echo "Docker is not installed. Please install docker and try again." >&2
    exit 1
fi

if ! [ -x "$(command -v docker-compose)" ]; then
    echo "Docker Compose is not installed. Please install docker-compose and try again." >&2
    exit 1
fi

printf "Starting docker-compose stack build..."
docker-compose build

printf "${green}Build complete.${off}"
printf "Running migrations..."
docker-compose run --rm api yarn typeorm:run

printf "${green}Migrations complete.${off}"
printf "Running seed..."
docker-compose run --rm api yarn seed

printf "${green}Seed complete.${off}"
printf "

${green}Setup complete!${off}

Please run '${yellow}docker-compose up${off}' and navigate to http://127.0.0.1:3000 to see the frontend.
You can also go to http://127.0.0.1:3001/api/docs to see the API documentation.
"