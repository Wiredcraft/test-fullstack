import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

import { HTTPStatus } from '../errors/enums/http-status';

export const validateResource =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body as object,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: unknown) {
      console.log(e);
      return res.status(HTTPStatus.BAD_REQUEST).send((e as ZodError).errors);
    }
  };
