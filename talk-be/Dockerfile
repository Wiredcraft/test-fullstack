FROM node:10.16.0-slim

WORKDIR .

COPY . .

RUN npm install
RUN npm install -g @nestjs/cli
RUN npm run build
RUN npm cache clean --force

EXPOSE 3000
CMD [ "node", "dist/main" ]
