# Up and Running

## Prerequisites

- node 14
- yarn
- MySQL database

## Setup Database

Import mysql file in `db/hacker-talks.sql` into mysql database.

## Configuration

Make the follow `.env` file beside this README.

```
PORT=3000

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=
DB_PWD=
DB_NAME=

JWT_KEY=my-secret-key
```

## Install node packages

> yarn

## Run the server

> yarn serve

Open browser and navigate to `http://localhost:3000` for the GraphQL playground.
