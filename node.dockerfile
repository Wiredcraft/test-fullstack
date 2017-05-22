FROM node:alpine

WORKDIR /static
ADD ./lightning_talk/static /static

RUN yarn
