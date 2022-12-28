# Lightning Talks App

## Introduction

This is fullstack web project includs both [fontend](../client) & [backend](../server/) applications written in Typescript.
Frontend based on React. Backend based on Express.

## Quick Start

After you pulled latest code from `master` branch.

### 1. Install dependencies

```bash
# install dependencies of base, like eslint plugins for all projects
yarn

# install frontend related dependencies
cd client
yarn

# install backend related dependencies
cd ../server
yarn
```

### 2. Setup database
```bash
# pull the database image, assume you have installed docker
docker pull postgres:15

# create environment variable file
cp ./server/.env.sample ./server/.env
# change the db config as you prefer
vi ./server/.env

# start db by docker compose
yarn start:db

cd ./server
# deploy db tables and initl data with seed file, usually for production deply
yarn migrate:deploy
# deploy db tables and initl data with seed file and generate prisma types, usually for development
yarn migrate
```

> Tips:
>
>   Once you changed prisma schema and run migrate in development, if you're using VSCode, you need restart ESLint and Typescript server.
>   As it will generate new Types in Typescript, need to reload to avoid type lint error in your editor.

### 3. Start applications
```bash
cd ./server
yarn dev

cd ../client
yarn start
```

Then, open [http://localhost:9999](http://localhost:9999) (by default), enjoy!

## Tech Stack

### Frontend

see [client/package.json](../client/package.json)

- [ahooks](https://github.com/alibaba/hooks) - Library of React reusable hooks. I use the `useRequest` for handle async API requests. Its main design idea is similar with the blog from https://www.robinwieruch.de/react-hooks-fetch-data/

- [axios](https://axios-http.com) - Famous XMLHTTPRequest library. I made the api [request](../client/src/utils/client.ts) & [error handle](../client/src/utils/client-error.ts) utils based on it. Could be reused on different projects.

- [clsx](https://github.com/lukeed/clsx#readme) - A `classnames` like library, but smaller & faster as it claimed.

- [dayjs](https://day.js.org) - Immutable date time library alternative to `Moment.js` with the same modern API

- [formik](https://formik.org) - Build forms in React, reduce a lot of duplicate code.

- [yup](https://github.com/jquense/yup) - Simple Object schema validation, works good with formik.

- [normalize.css](https://necolas.github.io/normalize.css) - CSS resets.

- [recoil](https://recoiljs.org/) - A state management library for React. I just started to experience a couple of days. Seems it not very easy to handle async state updates. So I only use it to replace hand make React context in the project.

### Backend

It took me some time to decide which framework to use for backend.  As I'm familiar with Nest.js.  But, it seems a little complex for this small project.  And it starts from a scaffolding tool to coding.  Finally, I decide to use Express which used by Nest under the hood.

see [server/package.json](../server/package.json)

- [@prisma/client](https://www.prisma.io/client) - A node.js ORM tool, very strong support for typescipt.

- [dotenv](https://github.com/motdotla/dotenv#readme) - Loads environment variables from .env file.

- [es6-error](https://github.com/bjyoungblood/es6-error) - A class for extends `Error` reusable.

- [express-async-errors](https://github.com/davidbanham/express-async-errors#readme) - Async/await error handling support for Express.js. As Express only design to handle sync handler, should always call `next()` to continue the workflow. The library can catch the thrown exception to handle by next middleware.

- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme) - JSON Web Token implementation.

- [md5](https://github.com/pvorb/node-md5#readme) - MD5 encryption library.

- [zod](https://github.com/colinhacks/zod) -TypeScript-first schema declaration and validation library.

## Functionality Design

### Form Validation

#### Frontend

I'm using `Formik` + `Yup` for form validation workflow in client side. When data submitted, formik will call its validate method, which implemented by yup, and update its internal state `error`.

#### Backend

In server side, I create [validate-request](../server/src/middleware/validate-request.ts) middleware to handle request data, like body, query or params in path, and valid by zod library. If validate failed, will throw wrapped [error](../server/src/errors/) and handle by [error-handler](../server/src/middleware/error-handler.ts) middleware.

### Error Handling

#### Frontend

I defined [error handle](../client/src/utils/client-error.ts) in client side base on the `Axios` library. It will convert all types of exception thrown from Axios to `ClientError`, which supports multiple types error handler, like network error, request error, response error or internal error, etc.

The expectation is to support global error handler could be executed before and after request level handlers on different pages. The idea is inspired by `Event.preventDefault()` API.  So the `onFinal` callback will always be executed, to handle `Not Found` or `Unauthorized Error` like global errors, unless the code invoke `ClientError.preventDefault()` to explicitly stop that.

#### Backend

Using `express-async-errors` to make express middleware could always call `next()` even the error thrown unexcepted. And using [error-handler](../server/src/middleware/error-handler.ts) middleware to handle and wrap the error into response in a consistent way.

> BTW, I also add `Response.success()` and `Response.error()` APIs to Express, to make the response body consistent.

### Authentication

I'm using JWT with access & refresh token for authentication strategy.  The workflows is as below:

#### Login

1. When user post login request and validated success.
2. Server create a access token (JWT), with a short expire date, not saving it.
3. Server check if the user already has a active session (refresh token) in database, or create a new one (refresh token) with a long expire date.
4. Return the access token & refresh token (get or created above).
5. The client side will save access & refresh tokens into `local storage` of browser for further api request.
    - Access token will attached into headers as `Authorization: Bearer {{token}}` for server to verify the user authentication.
    - Refresh token will used to post for a new access token before it expired.
    - Saving into `local storage` is used to prevent XXS attack, to avoid include credentials as user not expected.
5. After above, client side will start a timeout in loop, before the access token expired, to request a new access again. (Not implemented yet)

#### Logout
1. When the user post logout request, the server side will check if current user with a valid access token first.
2. After check success, server will invalid the user's session (refreh token) in db to disallow further refresh request.
3. After client side recieve success response, will remove the access & refresh token in `local storage`.


#### Refresh

As the access token will expired in a short period, the refresh token is designed to avoid the pain of frequently login for user.  The workflow is:

1. When user open the client side page, it will check if there's any refresh token saved in `local storage`.
2. If exists, will try to post a request, with the refresh toke in body, to server to get a valid access token.
3. Server will check if the refresh token is valid, and sign a new access token to client if valid.
4. The client will recieve the new access toekn and save it into `local storage` for further requests.
5. After above, client side will start a timeout in loop, before the access token expired, to request a new access again. (Not implemented yet)

### Logging Strategies

Not implemented yet

## Something not Implemented

- User Register (See: database [seed](/server/prisma/seed.ts) for initial users to login)

- Refresh Access Token in Loop

- Logging Strategies

- Professional CICD workflow

- Unit Test

## Reference

### RESTFful API

See [open api](lightning-talks-api.openapi.json)

### Database Structure

See [prisma.schema](/server/prisma/schema.prisma)
