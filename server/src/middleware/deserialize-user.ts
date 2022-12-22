import { NextFunction, Request, Response } from 'express';

import { verifyJwt } from '../utils/jwt';

export function deserializeUser(req: Request, res: Response, next: NextFunction) {
  const accessToken = (req.headers.authorization || '').replace(/^Bearer\s/, '');
  if (!accessToken) return next();

  const decoded = verifyJwt<RequestUser>(accessToken, 'ACCESS_SECRET');
  if (decoded) req.user = decoded;

  return next();
}
