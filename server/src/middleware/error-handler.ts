import { NextFunction, Request, Response } from 'express';

import { HTTPError } from '../errors/http.error';
import { ValidationError } from '../errors/validation.error';

export function errorHandler(err: unknown, _req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) return next(err);

  if (err instanceof ValidationError) {
    res.error({ message: err.message, details: err.details }, err.status);
  } else if (err instanceof HTTPError) {
    res.error({ message: err.message }, err.status);
  } else {
    console.error(err);
    res.error({ message: 'Internal Server Error' });
  }
}
