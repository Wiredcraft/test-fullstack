FROM node:latest

WORKDIR /app

COPY ./client/ /app

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]