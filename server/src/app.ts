import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';

import { errorHandler } from './middleware/error-handler';
import authRouter from './routes/auth.routes';

dotenv.config();
const app = express();

app.use(bodyParser.json());

const basePath = process.env.BASE_PATH || '/api';
app.use(`${basePath}`, authRouter);
app.use(errorHandler);

const port = process.env.PORT || '80';
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
