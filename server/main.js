import * as fs from "fs";
import * as path from "path";
import App, { getTimeString } from "../lib/application";
import serve from "./serve";
import render from "./render";

const app = new App();

app.useLogger();

app.use(serve("/dist/", "dist/"));

if (process.env.NODE_ENV !== "production") {
  fs.watch("src", { recursive: true }, (eventType, filename) => {
    if (eventType !== "change") return;

    console.log(`[${getTimeString()}] reloading ${filename}...`);

    delete require.cache[`${process.cwd()}/server/render.js`];

    Object.keys(require.cache).forEach(key => {
      if (key.startsWith(`${process.cwd()}/src`)) {
        delete require.cache[key];
      }
    });

    try {
      require("./render");
      console.log(`[${getTimeString()}] reloaded successfully.`);
    } catch (err) {
      console.log(err);
    }
  });

  app.use(next => async (req, res) => {
    return await require("./render").default(next)(req, res);
  });
} else {
  app.use(render);
}

app.listen(process.env.PORT || 3000);
