import * as url from "url";
import React from "react";
import ReactDOM from "react-dom/server";
import fetch from "node-fetch";
import { getServerStore } from "../src/components/app-state";
import App from "../src/components/app";
import { rewind } from "../src/components/use-fetch";
import { rewind as rewindTitle } from "../src/components/use-title";
import { getAssetName } from "./serve";

function serializeState(state) {
  return JSON.stringify(state).replace(/</g, "\\u003c");
}

export default next => async (req, res) => {
  const { pathname, search, hash } = url.parse(req.url);
  const location = { pathname, search, hash };
  const { cookie } = req.headers;
  const store = getServerStore();

  const fetchWithCookie = url => fetch(url, { headers: { cookie } });

  ReactDOM.renderToStaticMarkup(
    <App initialState={store.state} serverLocation={location} />
  );

  const title = rewindTitle();

  await Promise.all(rewind().map(fn => fn(store.dispatch, fetchWithCookie)));

  const body = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charSet="utf-8">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
    <link rel="icon" href="data:image/png;base64,iVBORw0KGgo=">
    <link rel="stylesheet" href="/dist/${getAssetName("main.css")}">
  </head>
  <body>
    <div id="root"></div>
    <div id="modal-root"></div>
    <script src="/dist/${getAssetName("react.js")}"></script>
    <script src="/dist/${getAssetName("react-dom.js")}"></script>
    <script>
      window.__PRELOADED_STATE__=${serializeState(store.state)}
    </script>
    <script src="/dist/${getAssetName("main.js")}"></script>
  </body>
</html>`;

  const buf = Buffer.from(body);
  res.setHeader("Content-Length", buf.length);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(buf);
};
