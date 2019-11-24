# Usage: docker build -t rankun203/test-fullstack .
# docker run --rm -p 8000:80 rankun203/test-fullstack
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
RUN npm run build

# Serving
FROM nginx:alpine

COPY --from=build --chown=nginx:nginx /app/dist /usr/share/nginx/html
COPY ./dockerfiles/nginx/default.conf /etc/nginx/conf.d/default.conf
RUN touch /var/run/nginx.pid && chown nginx:nginx /var/run/nginx.pid

# USER nginx

EXPOSE 80
# HEALTHCHECK  --interval=3s --timeout=3s \
#   CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1
