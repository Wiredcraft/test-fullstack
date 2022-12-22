import { NextFunction, Request, Response } from 'express';

import { HTTPStatus } from '../errors/enums/http-status';

export function requireUser(req: Request, res: Response, next: NextFunction) {
  if (req.user == null) {
    return res.sendStatus(HTTPStatus.UNAUTHORIZED);
  }

  return next();
}
