import App from "./application";
import fetch from "node-fetch";

test("works with all sync middlewares", async () => {
  const app = new App();

  app.use(next => next);

  await app.listen();
  const res = await fetch(`http://localhost:${app.port()}`);

  expect(res.status).toBe(404);
  await expect(res.text()).resolves.toBe("Not Found");

  app.server.close();
});

test("compose middlewares", async () => {
  const app = new App();
  const calls = [];

  app.use(next => (req, res) => {
    calls.push(1);
    next(req, res);
  });

  app.use(next => (req, res) => {
    calls.push(2);
    next(req, res);
  });

  app.use(next => (req, res) => {
    calls.push(3);
    next(req, res);
  });

  await app.listen();
  await fetch(`http://localhost:${app.port()}`);

  expect(calls).toEqual([1, 2, 3]);

  app.server.close();
});

test(".route pass query to route function", async () => {
  const app = new App();

  app.route("get", "/path", async (req, res, query) => {
    expect(query).toBe("q=42");
    res.end();
  });

  await app.listen();
  await fetch(`http://localhost:${app.port()}/path?q=42`);

  app.server.close();
});

test(".route pass custom route parameter to route function", async () => {
  const app = new App();

  app.route(
    "get",
    "/users/:id/articles/:id",
    (req, res, query, userId, articleId) => {
      expect(userId).toEqual("1");
      expect(articleId).toEqual("1");
      res.end();
    }
  );

  await app.listen();
  await fetch(`http://localhost:${app.port()}/users/1/articles/1`);

  app.server.close();
});

test(".json response 204 if route fn return nothing and res.statusCode < 300", async () => {
  const app = new App();

  app.json("get", "/", (req, res, query) => {});

  await app.listen();
  const res = await fetch(`http://localhost:${app.port()}`);

  expect(res.status).toBe(204);

  app.server.close();
});

test(".json response anything route fn returned as JSON", async () => {
  const app = new App();

  app.json("get", "/", () => {
    return { message: "Hi" };
  });

  await app.listen();
  const res = await fetch(`http://localhost:${app.port()}`);

  expect(res.headers.get("content-type")).toBe(
    "application/json; charset=utf-8"
  );
  await expect(res.json()).resolves.toEqual({ message: "Hi" });

  app.server.close();
});

test(
  ".json automatically response JSON body if" +
    " res.statusCode > 300 and route fn return nothing",
  async () => {
    const app = new App();

    app.json("get", "/", (req, res) => {
      res.statusCode = 400;
    });

    await app.listen();
    const res = await fetch(`http://localhost:${app.port()}`);

    expect(res.status).toBe(400);
    expect(res.headers.get("content-type")).toBe(
      "application/json; charset=utf-8"
    );
    await expect(res.json()).resolves.toEqual({ name: "Bad Request" });

    app.server.close();
  }
);

test(".json parse request body and pass result to route fn", async () => {
  const app = new App();

  app.json("post", "/", (req, res, query, body) => {
    expect(body).toEqual({ message: "Hi" });
  });

  await app.listen();
  await fetch(`http://localhost:${app.port()}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message: "Hi" })
  });

  app.server.close();
});
