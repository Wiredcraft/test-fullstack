env-dev:
	cp -f .env.dev projects/client/.env && cp -f .env.dev projects/server/.env;

env-prod:
	cp -f .env.prod projects/client/.env && cp -f .env.dev projects/server/.env;

db-init:
	cd projects/server && yarn build && yarn db:init;

db-seed:
	cd projects/server && yarn build && yarn db:seed;

build-dev: env-dev
	yarn all:build

build-prod: env-prod
	yarn all:build

start-dev: build-dev
	yarn all:start:dev;

start-prod: build-prod
	yarn all:start:prod;

boot-dev:
	yarn && make db-init && make start-dev

boot-prod:
	yarn && make db-init && make start-prod

boot-seed-dev:
	yarn && make db-seed && make start-dev

boot-seed-prod:
	yarn && make db-seed && make start-prod

test:
	yarn wss run test --verbose
