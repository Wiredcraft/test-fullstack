import http from "http";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "@koa/router";
import logger from "koa-logger";

import { HttpError } from "./errors";
import { listTalks, createTalk, getTalk, voteTalk } from "./talks";

const port = 8080;
createServer().listen(port, () => {
  console.log(`visit http://localhost:${port}`);
});

function createServer(): http.Server {
  const router = createRouter();

  const app = new Koa();
  app.use(logger());
  app.use(handleError);
  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());

  const server = http.createServer(app.callback());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  server.on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.error("EADDRINUSE");
      process.exit(-1);
    }
  });

  return server;
}

function createRouter(): Router {
  const apiRouter = new Router();
  apiRouter.get("/talks", listTalks);
  apiRouter.post("/talks", createTalk);
  apiRouter.get("/talks/:id", getTalk);
  apiRouter.post("/talks/:id/vote", voteTalk);

  const router = new Router();
  router.get("/health", async (ctx) => {
    ctx.body = "OK";
  });

  router.use("/api", apiRouter.routes(), apiRouter.allowedMethods());
  return router;
}

async function handleError(ctx: Koa.Context, next: () => Promise<void>): Promise<void> {
  try {
    await next();
  } catch (err) {
    if (err instanceof HttpError) {
      ctx.status = err.code;
      ctx.body = { status: "error", message: err.message, error: err.error };
    } else if (err instanceof Error) {
      ctx.status = 500;
      ctx.body = { status: "error", message: err.message };
    } else {
      ctx.status = 500;
      ctx.body = { status: "error", message: "unknown error" };
    }
  }
}
