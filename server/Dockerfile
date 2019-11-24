# Usage: docker build -t rankun203/test-fullstack-api .
# docker run --rm -p 8001:3000 rankun203/test-fullstack-api
# Building
FROM node:12-buster-slim AS build

WORKDIR /app
ENV NODE_ENV=production
RUN npm i -g parcel-bundler

# Only copy package.json, as it won't change that often
COPY package.json package-lock.json ./
RUN npm i

# If project files change
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
