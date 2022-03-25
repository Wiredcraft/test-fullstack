"use strict";
const Koa = require("koa");
const app = new Koa();
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const errorHandle = require("./middlewares/errorHandle");
const jwt = require('koa-jwt');

const path = require("path");

const routes = require("./routes");

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);

app.use(errorHandle());

app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// jwt
app.use(async function (ctx, next) {
  try {
    await next()
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access!'
      }
    } else {
      throw err
    }
  }
})
app.use(jwt({ secret: 'demo' }).unless({ path: [/^\/api\/auth/,/^\/api\/user\/reg/] }));

// static
app.use(require("koa-static")(path.join(__dirname, "../public")));

// router
app.use(routes.routes(), routes.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;