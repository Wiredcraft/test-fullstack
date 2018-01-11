## Live Demo

http://news.jzf.life/index.html

So far the live demo is served by static files built by Webpack which interacts with a mock express server.

## Scripts

### Run

```
npm install
npm start
```
This runs Webpack dev server and Express mock server concurrently. Notice that Webpack dev server receives all requests and proxys API requests to mock server.

### Build

```
npm install
npm run build
```
Build static assets to `build/` dir.

### Test

```
npm install
npm run test
```
Test with Jest. There are basic unit tests for components and reducers.

## API

```
GET api/talks
```
Returns all talks. Success would be status code 200 with a JSON array. For example:

```
[{
  "author": "j",
  "title": "Hello world!",
  "description": "Hello world!",
  "id": 12345,
  "created": 1515419178895,
  "votes": 2333,
  "voted": true
}]
```

```
POST api/talks
```
Creates a new talk, receives the created talk and returns it. Success would be status code 201 with a JSON object. Error may be status code 400 with a `violation` field pointing out which part is invalid in the post body.

Requires a JSON object including the following fields:
- author: string
- title: string
- description: string

For example:
```
{
  "author": "j",
  "title": "Hello world!",
  "description": "Hello world!"  
}
```

Success return for example:
```
{
  "author": "j",
  "title": "Hello world!",
  "description": "Hello world!",
  "id": 12345,
  "created": 1515419178895,
  "votes": 0,
  "voted": false
}
```

Failure return for example:
```
{
  "violation": {
    "title": "title exists"
  }
}
```

```
POST api/talks/:id/vote
```
Votes for a talk. Success would be status code 204 with no content.

## Libraries and Tools

- create-react-app: fast bootstrap the project
- Redux + redux-thunk: manage state and async actions
- Express + faker.js: provide a mock server

## TODO

- Advanced Redux middleware, high-order reducers and normalizr
- Pagination / Infinite scrolling

Stuffs like above may be added or abstracted when the project becomes larger or for better cross-browser compatibility, but I prefer to keep it simple for now.
