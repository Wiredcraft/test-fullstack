import { NextFunction, Request, Response } from 'express';

import { verifyAccessToken } from '../modules/auth/auth.service';

export function deserializeUser(req: Request, _res: Response, next: NextFunction) {
  const accessToken = (req.headers.authorization || '').replace(/^Bearer\s/, '');
  if (!accessToken) return next();

  const payload = verifyAccessToken(accessToken);
  if (payload) req.user = payload;

  return next();
}
