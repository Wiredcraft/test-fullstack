import { NextFunction, Request, Response } from 'express';

import { HTTPError } from '../errors/http-error';
import { HTTPStatus } from '../errors/enums/http-status';

export function errorHandler(err: unknown, _req: Request, res: Response, next: NextFunction) {
  console.error(err);

  if (res.headersSent) return next(err);

  if (err instanceof HTTPError) {
    res.status(err.status).send({ error: { message: err.message } });
    return;
  }

  res
    .status(HTTPStatus.INTERNAL_SERVER_ERROR)
    .send({ error: { message: 'Internal Server Error' } });
}
