import { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from '../errors/unauthorized.error';

export function requireUser(req: Request, _res: Response, next: NextFunction) {
  if (req.user == null) throw new UnauthorizedError();

  return next();
}
