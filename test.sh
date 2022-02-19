#!/usr/bin/env bash

set -e

echo "


test-fullstack NestJS/React Test Script
Version: 0.0.1
Author: Stefan Wawrzyn <swawrzyn@gmail.com>
"

if ! [ -x "$(command -v docker)" ]; then
    echo "Docker is not installed. Please install docker and try again." >&2
    exit 1
fi

if ! [ -x "$(command -v docker-compose)" ]; then
    echo "Docker Compose is not installed. Please install docker-compose and try again." >&2
    exit 1
fi

echo "Starting backend tests..."
sh -c "docker-compose run --rm api yarn test"

echo "Backend tests complete."
echo "Starting frontend tests..."

sh -c "docker-compose run --rm frontend yarn test"