FROM node:alpine

ADD ./lightning_talk/client /client

RUN yarn
