import App from "../lib/application";
import * as auth from "./resource/auth";
import * as talks from "./resource/talks";

const app = new App();

app.useLogger();

app.use(next => async (req, res) => {
  if (req.headers.origin) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  if (req.method === "OPTIONS") {
    const method = req.headers["access-control-request-method"];
    if (method) {
      res.setHeader("Access-Control-Allow-Methods", method);
    }
    const headers = req.headers["access-control-request-headers"];
    if (headers) {
      res.setHeader("Access-Control-Allow-Headers", headers);
    }
    res.statusCode = 204;
    res.end();
    return;
  }
  await next(req, res);
});

app.json("post", "/login", auth.login);
app.json("post", "/users", auth.createUser);
app.json("put", "/logout", auth.logout);

app.use(auth.parseReqUser);

app.json("get", "/user", auth.read);

app.json("post", "/talks", talks.create);
app.json("get", "/talks", talks.list);
app.json("get", "/talks/:id", talks.read);
app.json("put", "/talks/:id/vote", talks.vote);
app.json("delete", "/talks/:id/vote", talks.unvote);

app.listen(process.env.PORT || 4000);
