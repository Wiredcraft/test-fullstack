import { randomUUID } from 'crypto';

import { Request, Response } from 'express';

import { BadRequestError } from '../../errors/bad-request.error';
import { NotFoundError } from '../../errors/not-found.error';
import { UnauthorizedError } from '../../errors/unauthorized.error';
import { WrongCredentialsError } from '../../errors/wrong-credentials.error';
import { getUser, getUserByPassword } from '../users/user.service';

import { LoginInput, LogoutInput, RefreshInput } from './auth.schema';
import {
  createSession,
  getValidSession,
  invalidSession,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from './auth.service';

/**
 * Create Session Controller ( Login )
 * @param req
 * @param res
 * @returns
 */
export async function createSessionHandler(
  req: Request<unknown, unknown, LoginInput['body']>,
  res: Response,
) {
  const user = await getUserByPassword(req.body);
  if (user == null) {
    throw new WrongCredentialsError();
  }

  const accessToken = signAccessToken(user);
  // Trying to get exists valid session
  let validSession = await getValidSession({ userId: user.id });
  if (validSession == null) {
    // Create a new session and sign JWT with its id
    const sessionId = randomUUID();
    const refreshToken = signRefreshToken({ session: sessionId });
    validSession = await createSession({
      id: sessionId,
      token: refreshToken,
      user: { connect: { id: user.id } },
    });
  }

  res.success({ accessToken, refreshToken: validSession.token });
}

const MESSAGE_CANT_REFRESH_ACCESS_TOKEN = 'Could not refresh access token';

/**
 * Refresh Access Token Controller
 * @param req
 * @param res
 */
export async function refreshSessionHandler(
  req: Request<unknown, unknown, RefreshInput['body']>,
  res: Response,
) {
  const payload = verifyRefreshToken(req.body.token);
  if (payload == null) {
    // Not a valid JWT
    throw new BadRequestError(MESSAGE_CANT_REFRESH_ACCESS_TOKEN);
  }

  const session = await getValidSession({ id: payload.session });
  if (session == null) {
    // The session not exists
    throw new BadRequestError(MESSAGE_CANT_REFRESH_ACCESS_TOKEN);
  }

  const user = await getUser({ id: session.userId });
  if (user == null) {
    // The user of session not exists
    throw new BadRequestError(MESSAGE_CANT_REFRESH_ACCESS_TOKEN);
  }

  const accessToken = signAccessToken(user);
  res.success({ accessToken });
}

/**
 * Query Current Session User Controller
 * @param req
 * @param res
 */
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

/**
 * Remove Session Controller - ( Logout )
 * @param req
 * @param res
 */
export async function removeSessionHandler(
  req: Request<unknown, unknown, LogoutInput['body']>,
  res: Response,
) {
  const { user } = req;
  if (user == null) {
    throw new UnauthorizedError();
  }

  const payload = verifyRefreshToken(req.body.token);
  if (payload == null) {
    // Not a valid JWT
    throw new BadRequestError(`The token is invalid.`);
  }

  const session = await getValidSession({ id: payload.session });
  if (session == null) {
    // Response success if already not exists valid session
    res.success();
    return;
  }

  // The session not belongs to current user
  if (session.userId !== user.id) {
    throw new BadRequestError(`The token is invalid`);
  }

  await invalidSession({ id: payload.session });
  res.success();
}
