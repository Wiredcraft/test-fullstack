import * as http from "http";
import * as url from "url";
import HTTPError from "./http-error";
import parseBody from "./parse-body";
import compose from "./compose";

export const getTimeString = () => {
  const date = new Date();
  return [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map(str => String(str).padStart(2, "0"))
    .join(":");
};

const match = (rules, path) => {
  if (rules.length !== path.length) return null;
  let params = [];

  for (let [index, rule] of rules.entries()) {
    const subPath = path[index];

    if (rule.startsWith(":")) {
      params.push(subPath);
    } else if (rule !== subPath) {
      return null;
    }
  }

  return params.map(decodeURIComponent);
};

export default class App {
  static basicResponse(res, statusCode, text) {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "text/plain");
    res.end(text || http.STATUS_CODES[statusCode]);
  }

  static handleNotFound(req, res) {
    App.basicResponse(res, 404);
  }

  static handleError(error, res) {
    const isHTTPError = error instanceof HTTPError;

    if (!isHTTPError) {
      console.error(error);
    }

    if (res.headerSent || !res.writable) return;

    let code = 500;

    if (typeof error === "number") {
      code = error;
    } else if (error.statusCode) {
      code = error.statusCode;
    }

    App.basicResponse(res, code, isHTTPError ? error.message : null);
  }

  constructor() {
    this.middlewares = [];
  }

  use(fn) {
    this.middlewares.push(fn);
  }

  useLogger() {
    this.use(next => async (req, res) => {
      const start = Date.now();
      const path = `${req.method.padEnd(7, " ")} ${decodeURIComponent(
        req.url
      )}`;

      console.log(`[${getTimeString()}] ${path}`);

      await next(req, res);

      const resInfo = `${Date.now() - start}ms ${res.statusCode}`;
      console.log(`${resInfo.padStart(10, " ")} ${path}`);
    });
  }

  route(method, path, fn) {
    const rules = path.split("/").filter(v => v);
    method = method.toUpperCase();

    this.use(next => async (req, res) => {
      if (req.method !== method) {
        return await next(req, res);
      }

      const { pathname, query } = url.parse(req.url);
      const matchResult = match(rules, pathname.split("/").filter(v => v));

      if (!matchResult) {
        return await next(req, res);
      }

      await fn(req, res, query, ...matchResult);
    });
  }

  json(method, path, fn) {
    method = method.toUpperCase();

    this.route(method, path, async (req, res, ...args) => {
      if (method === "POST" || method === "PATCH") {
        args.push(await parseBody(req));
      }

      let body = await fn(req, res, ...args);

      if (body || res.statusCode > 300) {
        if (!body) {
          body = { name: http.STATUS_CODES[res.statusCode] };
        }
        body = JSON.stringify(body);
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(body);
      } else {
        res.statusCode = 204;
        res.end();
      }
    });
  }

  callback() {
    const handleRequest = compose(this.middlewares)(App.handleNotFound);
    return (req, res) => {
      handleRequest(req, res).catch(error => App.handleError(error, res));
    };
  }

  listen(port) {
    const server = http.createServer(this.callback());
    this.server = server;
    return server.listen(port, () => {
      console.log(
        `[${getTimeString()}] listening on http://localhost:${port}...`
      );
    });
  }
}
