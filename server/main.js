import * as fs from "fs";
import * as path from "path";
import App from "../lib/application";
import serve from "./serve";
import render from "./render";

const { NODE_ENV, PORT = 3000 } = process.env;
const app = new App();

app.useLogger();

app.use(serve("/dist/", "dist"));

if (NODE_ENV !== "production") {
  const rollup = require("rollup");
  const config = require("../rollup.config").default;

  process.env.BABEL_ENV = "client";
  const watcher = rollup.watch(config);
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
          App.log("reloaded successfully.");
        } catch (error) {
          App.log("failed to reload:");
          if (error.code === "BABEL_PARSE_ERROR") {
            console.log(error.message);
          } else {
            console.log(error);
          }
        }
        break;

      case "BUNDLE_END":
        App.log(`bundle built in ${event.duration}ms`);
        break;

      case "ERROR":
        if (event.error.pluginCode !== "BABEL_PARSE_ERROR") {
          console.log(event.error);
        }
        break;

      case "FATAL":
        console.log(event.error);
    }
  });

  app.use(next => async (req, res) => {
    return await require("./render").default(next)(req, res);
  });
} else {
  app.use(render);
}

app.listen(PORT, () => App.log(`listening on port ${PORT}`));
