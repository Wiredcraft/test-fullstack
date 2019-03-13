import * as url from "url";
import React from "react";
import ReactDOM from "react-dom/server";
import fetch from "node-fetch";
import App, { reducer, initialState } from "../src/components/app";
import { rewind } from "../src/components/use-fetch";
import { rewind as rewindTitle } from "../src/components/use-title";

function serializeState(state) {
  return JSON.stringify(state).replace(/</g, "\\u003c");
}

export default next => async (req, res) => {
  const { pathname, search, hash } = url.parse(req.url);
  const location = { pathname, search, hash };

  let state = initialState;

  const dispatch = action => {
    state = reducer(state, action);
  };

  ReactDOM.renderToStaticMarkup(
    <App initialState={state} serverLocation={location} />
  );

  const title = rewindTitle();

  await Promise.all(rewind().map(fn => fn(dispatch, fetch)));

  const body = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charSet="utf-8">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
    <link rel="icon" href="data:image/png;base64,iVBORw0KGgo=">
    <link rel="stylesheet" href="/dist/main.css">
  </head>
  <body>
    <div id="root"></div>
    <div id="modal-root"></div>
    <script src="/dist/react.development.js"></script>
    <script src="/dist/react-dom.development.js"></script>
    <script>
      window.__PRELOADED_STATE__=${serializeState(state)}
    </script>
    <script src="/dist/main.js"></script>
  </body>
</html>`;

  const buf = Buffer.from(body);
  res.setHeader("Content-Length", buf.length);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(buf);
};
