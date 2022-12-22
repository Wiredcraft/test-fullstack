import { Session, User } from '@prisma/client';

import { signJwt, verifyJwt } from '../utils/jwt';

import { createSession } from './session.service';

export function signAccessToken(user: Pick<User, 'id' | 'username'>) {
  const accessToken = signJwt(user, process.env.ACCESS_SECRET ?? 'access secret key', {
    expiresIn: process.env.ACCESS_EXPIRES ?? '15m',
  });

  return accessToken;
}

export function verifyAccessToken(token: string) {
  return verifyJwt<Pick<User, 'id' | 'username'>>(
    token,
    process.env.ACCESS_SECRET ?? 'access secret key',
  );
}

export async function signRefreshToken(userId: User['id']) {
  const session = await createSession(userId);

  const refreshToken = signJwt(
    { session: session.id },
    process.env.REFRESH_SECRET ?? 'refresh secret key',
    { expiresIn: process.env.REFRESH_EXPIRES ?? '1y' },
  );

  return refreshToken;
}

export function verifyRefreshToken(token: string) {
  return verifyJwt<{ session: Session['id'] }>(
    token,
    process.env.REFRESH_SECRET ?? 'refresh secret key',
  );
}
