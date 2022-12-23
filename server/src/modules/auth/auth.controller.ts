import { Request, Response } from 'express';

import { UnauthorizedError } from '../../errors/unauthorized';
import { WrongCredentialsError } from '../../errors/wrong-credentials';
import { getUser, getUserByPassword } from '../users/user.service';

import { LoginInput, RefreshInput } from './auth.schema';
import { getSession, signAccessToken, signRefreshToken, verifyRefreshToken } from './auth.service';

export async function createSessionHandler(
  req: Request<object, object, LoginInput['body']>,
  res: Response,
) {
  const user = await getUserByPassword(req.body);
  if (user == null) throw new WrongCredentialsError();

  const accessToken = signAccessToken(user);
  const refreshToken = await signRefreshToken(user.id);

  res.success({ accessToken, refreshToken });
}

const MESSAGE_CANT_REFRESH_ACCESS_TOKEN = 'Could not refresh access token';
export async function refreshSessionHandler(
  req: Request<object, object, RefreshInput['body']>,
  res: Response,
) {
  const payload = verifyRefreshToken(req.body.token);
  if (payload == null) {
    throw new UnauthorizedError(MESSAGE_CANT_REFRESH_ACCESS_TOKEN);
  }

  const session = await getSession({ id: payload.session });
  if (session == null || !session.valid) {
    throw new UnauthorizedError(MESSAGE_CANT_REFRESH_ACCESS_TOKEN);
  }

  const user = await getUser({ id: session.userId });
  if (user == null) {
    throw new UnauthorizedError(MESSAGE_CANT_REFRESH_ACCESS_TOKEN);
  }

  const accessToken = signAccessToken(user);
  res.success({ accessToken });
}
