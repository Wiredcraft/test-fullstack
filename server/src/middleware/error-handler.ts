import { NextFunction, Request, Response } from 'express';

import { HTTPError } from '../errors/http-error';
import { HTTPStatus } from '../errors/enums/http-status';
import { ValidationError } from '../errors/validation-error';

export function errorHandler(err: unknown, _req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) return next(err);

  if (err instanceof ValidationError) {
    res.status(err.status).send({ error: { message: err.message, details: err.details } });
  } else if (err instanceof HTTPError) {
    res.status(err.status).send({ error: { message: err.message } });
  } else {
    console.error(err);

    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .send({ error: { message: 'Internal Server Error' } });
  }
}
