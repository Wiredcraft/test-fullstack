// import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';

import { HTTPStatus } from './errors/enums/http-status';
import { errorHandler } from './middleware/error-handler';
import authRouter from './routes/auth.routes';
import talksRouter from './routes/talks.routes';

dotenv.config();

const app = express();
// add global response handler
app.response.success = function (data: unknown, code = HTTPStatus.OK) {
  this.status(code).json({ data });
  return this;
};
app.response.error = function (error: unknown, code = HTTPStatus.INTERNAL_SERVER_ERROR) {
  this.status(code).json({ error });
  return this;
};

app.use(express.json());

const basePath = process.env.BASE_PATH || '/api';
app.use(basePath, authRouter);
app.use(basePath, talksRouter);
app.use(errorHandler);

const port = process.env.PORT || '80';
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
