## Live demo

http://news.jzf.life/index.html

I'm not familiar with Node.js and Loopback, and I haven't finished a real back-end service yet. So far the live demo is served by static files built by webpack which interacts with a mock express server.

## Scripts

### Run

```shell
npm install
npm start
```

### Build

```shell
npm install
npm run build
```

### Test

## Document

### Code Structure

I believe a well-designed code structure itself could be a good document and for React component, `propTypes` may tell most of the things you would want to know about the component.

### Libraries and Tools

- create-react-app: fast bootstrap the project
- Redux + redux-thunk: manage state and async actions
- Express + faker.js: provide a mock server

## TODO

- PostCSS
- ESLint
- Pagination / Infinite scrolling
- Redux middleware

Stuffs like above may be added or abstracted when the project becomes larger or needs better cross-browser compatibility, but I prefer to keep it simple for now.
