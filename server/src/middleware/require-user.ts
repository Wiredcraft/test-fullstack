import { Request } from 'express';

import { UnauthorizedError } from '../errors/unauthorized.error';

export function requireUser(req: Request) {
  if (req.user == null) throw new UnauthorizedError();
}
