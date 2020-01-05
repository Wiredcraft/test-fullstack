import express from "express";

import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";
import formatResponse from "./middleware/response";
import auth from "./middleware/auth";
import errorHandler from "./middleware/error";
import log from "./middleware/log";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(log);
app.use(auth);
app.use(formatResponse);
app.use(routes);
app.use(errorHandler);

app.listen(8383, () =>
  // eslint-disable-next-line no-console
  console.log("🚀 Server ready at: http://localhost:8383")
);

export default app;
