import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

import { ValidationError } from '../errors/validation-error';

export const validateResource =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body as object,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err: unknown) {
      if (err instanceof ZodError) throw new ValidationError(err.errors);

      throw err;
    }
  };
