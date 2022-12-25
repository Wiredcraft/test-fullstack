import { Request, Response } from 'express';

import { NotFoundError } from '../../errors/not-found.error';
import { UnauthorizedError } from '../../errors/unauthorized.error';
import { WrongCredentialsError } from '../../errors/wrong-credentials.error';
import { getUser, getUserByPassword } from '../users/user.service';

import { LoginInput, LogoutInput, RefreshInput } from './auth.schema';
import {
  getSession,
  invalidSession,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from './auth.service';

export async function createSessionHandler(
  req: Request<object, object, LoginInput['body']>,
  res: Response,
) {
  const user = await getUserByPassword(req.body);
  if (user == null) throw new WrongCredentialsError();

  const accessToken = signAccessToken(user);
  const validSession = await getSession({ userId: user.id, valid: true });
  if (validSession != null) {
    res.success({ accessToken, refreshToken: validSession.token });
    return;
  }

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

export async function getSessionHandler(req: Request, res: Response) {
  const { user } = req;

  if (user == null) {
    throw new UnauthorizedError();
  }

  const userInfo = await getUser({ id: user.id });
  if (userInfo == null) {
    throw new NotFoundError(`The user of id: \`${user.id}\` not exists.`);
  }

  res.success(userInfo);
}

export async function removeSessionHandler(
  req: Request<object, object, LogoutInput['body']>,
  res: Response,
) {
  const { user } = req;

  if (user == null) {
    throw new UnauthorizedError();
  }

  const payload = verifyRefreshToken(req.body.token);
  if (payload == null) {
    throw new UnauthorizedError();
  }

  await invalidSession({ id: payload.session });

  res.success();
}
