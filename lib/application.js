import * as http from "http";
import * as url from "url";
import HTTPError from "./http-error";
import parseBody from "./parse-body";
import compose from "./compose";

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
  static log(message) {
    const d = new Date();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");

    if (process.env.NODE_ENV !== "production") {
      console.log(`[${hours}:${minutes}:${seconds}] ${message}`);
      return;
    }

    const month = String(d.getMonth() + 1).padStart(2, "0");
    const date = String(d.getDate()).padStart(2, "0");

    console.log(`[${month}-${date} ${hours}:${minutes}:${seconds}] ${message}`);
  }

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

      await next(req, res);

      const code = res.statusCode;
      const duration = String(Date.now() - start).padStart(3, " ");
      const method = req.method.padStart(7, " ");
      let url = decodeURIComponent(req.url);

      if (process.env.NODE_ENV !== "production") {
        App.log(`${code} ${duration}ms ${method} ${url}`);
        return;
      }

      url = url.padEnd(40, " ");

      const userAgent = req.headers["user-agent"] || "";

      App.log(`${code} ${duration}ms ${method} ${url} ${userAgent}`);
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
    const isAsync = handleRequest.constructor.name === "AsyncFunction";
    return (req, res) => {
      if (isAsync) {
        handleRequest(req, res).catch(err => App.handleError(err, res));
        return;
      }

      try {
        handleRequest(req, res);
      } catch (err) {
        App.handleError(err, res);
      }
    };
  }

  async listen(port, fn) {
    this.server = http.createServer(this.callback());

    await new Promise(resolve => {
      this.server.listen(port, () => {
        if (fn) fn();
        resolve();
      });
    });
  }

  port() {
    return this.server.address().port;
  }
}
