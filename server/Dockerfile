FROM node:14

WORKDIR /project

RUN ls .

COPY ./server/ /project

RUN npm install

CMD ["npm","start"]