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

For form data validation, I'm using [Yup](https://github.com/jquense/yup) as the schema validator, it works on both frontend and backend, compares to Joi, it's lighter and generally more friendly to use in browsers, and it supports backend as well.

In addition to that, I'm using [Formik](https://jaredpalmer.com/formik) to manage my form state and validates against schemas.
