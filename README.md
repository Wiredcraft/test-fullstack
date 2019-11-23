# Lightning Talks Polling App

## Wireframe & Design

Checkout [lightning-talks-polling.fig](https://github.com/rankun203/test-fullstack/blob/master/docs/lightning-talks-polling.fig), use Figma to open it. Or use [this view only link](https://www.figma.com/file/yFqtpELaUl31Qe0GGXTsXR/Lightning-Talks-Polling).

This app was designed in a Mobile First approach.

## API

API Documentation: [open-api.yaml](https://github.com/rankun203/test-fullstack/blob/master/docs/open-api.yaml), or use [this view only link](https://documenter.getpostman.com/view/4228/SW7Z3oDw).

## Run This Project

You can build the project locally and run it, or you can use the pre-built docker images to run.

### Pre-built Docker Image

```bash
npm run start:docker
# Then navigate to http://localhost:8000 in your browser
```

### Build

```bash
npm run start
# Then navigate to http://localhost:1234 in your browser
```

## Containerization

This project includes `Dockerfile`s for each sub-project (client, server), and have a `docker-compose.yml` which you can use to quickly spin up an instance.

## Deployment

For deployment, I'm using [this tool(reverse-proxy)](https://github.com/rankun203/reverse-proxy) I created to put it online.

## Tech Stack

### Form Validation

For form data validation, I'm using [Yup](https://github.com/jquense/yup) as the schema validator, it works on both frontend and backend, compares to Joi, it's lighter and generally more friendly to use in browsers, and it supports backend as well, and it supports multiple languages.

In addition to that, I'm using [Formik](https://jaredpalmer.com/formik) to manage my form state and validates against schemas.

### Error Handling

Server side: Heavily influenced by this repo [Wiredcraft/service-error](https://github.com/Wiredcraft/service-error). it's what I considered a good practice. Extend from ExtendableError is easier to work with than extending from Error itself.

### ID Generation

Use [cuid](https://github.com/ericelliott/cuid)(by ericelliott) instead of uuid/v1 or uuid/v4. UUID is like USB Type-C connector, the shape looks the same but the implementation can be vastly different. cuid offers the same functionality as uuid/v1, so for this particular project I'll just use cuid for better recognizability.

Similar to MongoDB's Object ID, it also breaks down into different parts which is faster for binary search since some parts in the front won't change that often.

The implementation of ID generation can be easily swapped, checkout [server/src/utils/id.js](https://github.com/rankun203/test-fullstack/blob/master/server/src/utils/id.js).

### Backend Overall Architecture

Applying practices of [Bob Martin's clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html), but due to limited time I have to design the API system, the implementation is not so "clean" after all(e.g., db part) and should be considered twice if it's gonna be used in production in large scale.

It looks like Dependency Injection in a way, under each layer(folder), there is an [index.js](https://github.com/rankun203/test-fullstack/blob/master/server/src/modules/talks/models/index.js) to configure the dependencies for other functions in the same module.

### JavaScript Code Style

On top of some of the best practices, here are a few opinionated JavaScript code style used in this project:

- Use named exports over default exports
- Normal functions and arrow functions both can be used, `function` keyword for easier naming and arrow functions for easier management of `this` scope.
