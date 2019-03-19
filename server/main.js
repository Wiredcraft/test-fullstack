import * as fs from "fs";
import * as path from "path";
import App, { getTimeString } from "../lib/application";
import serve from "./serve";
import render from "./render";

const app = new App();

app.useLogger();

app.use(serve("/dist/", "dist"));

if (process.env.NODE_ENV !== "production") {
  const rollup = require("rollup");
  const config = require("../rollup.config").default;

  process.env.BABEL_ENV = "client";
  const watcher = rollup.watch(config);
  const stdout = (...args) => console.log(...args);
  let started = false;

  watcher.on("event", event => {
    switch (event.code) {
      case "START":
        if (!started) {
          started = true;
          return;
        }

        delete require.cache[`${process.cwd()}/server/render.js`];

        Object.keys(require.cache).forEach(key => {
          if (key.startsWith(`${process.cwd()}/src`)) delete require.cache[key];
        });

        try {
          process.env.BABEL_ENV = "server";
          require("./render");
          process.env.BABEL_ENV = "client";
          stdout(`[${getTimeString()}] reloaded successfully.`);
        } catch (error) {
          stdout(`[${getTimeString()}] failed to reload:`);
          if (error.code === "BABEL_PARSE_ERROR") {
            stdout(error.message);
          } else {
            stdout(error);
          }
        }
        break;

      case "BUNDLE_END":
        stdout(`[${getTimeString()}] bundle built in ${event.duration}ms`);
        break;

      case "ERROR":
        if (event.error.pluginCode !== "BABEL_PARSE_ERROR") {
          stdout(event.error);
        }
        break;

      case "FATAL":
        stdout(event.error);
    }
  });

  app.use(next => async (req, res) => {
    return await require("./render").default(next)(req, res);
  });
} else {
  app.use(render);
}

app.listen(process.env.PORT || 3000);
