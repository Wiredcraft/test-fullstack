import { Prisma, Session, User } from '@prisma/client';

import { signJwt, verifyJwt } from '../../utils/jwt';
import prisma from '../../utils/prisma';

/*****************************************************************************
 * Session Services
 *****************************************************************************/
export async function createSession(data: Prisma.SessionCreateInput) {
  return prisma.session.create({ data });
}

export async function getValidSession(where: Omit<Prisma.SessionWhereInput, 'valid'>) {
  return prisma.session.findFirst({ where: { valid: true, ...where } });
}

export async function invalidSession(where: Prisma.SessionWhereUniqueInput) {
  return prisma.session.update({ where, data: { valid: false } });
}

// For further usage
// export async function getAllSessionsByUserId(userId: User['id']) {
//   return prisma.session.findMany({ where: { user: { id: userId }, valid: true } });
// }

// export async function invalidSessionById(sessionId: Session['id']) {
//   await prisma.session.update({ where: { id: sessionId }, data: { valid: false } });
// }

// export async function invalidSessionByUserId(userId: User['id']) {
//   await prisma.session.updateMany({
//     where: { user: { id: userId }, valid: true },
//     data: { valid: false },
//   });
// }

/*****************************************************************************
 * JWT Services
 *****************************************************************************/
export type AccessTokenPayload = Pick<User, 'id' | 'username'>;

export function signAccessToken(payload: AccessTokenPayload) {
  const accessToken = signJwt(payload, process.env.ACCESS_SECRET ?? 'access secret key', {
    expiresIn: process.env.ACCESS_EXPIRES ?? '15m',
  });

  return accessToken;
}

export function verifyAccessToken(token: string) {
  return verifyJwt<AccessTokenPayload>(token, process.env.ACCESS_SECRET ?? 'access secret key');
}

export interface RefreshTokenPayload {
  session: Session['id'];
}

export function signRefreshToken(payload: RefreshTokenPayload) {
  const refreshToken = signJwt(payload, process.env.REFRESH_SECRET ?? 'refresh secret key', {
    expiresIn: process.env.REFRESH_EXPIRES ?? '1y',
  });

  return refreshToken;
}

export function verifyRefreshToken(token: string) {
  return verifyJwt<RefreshTokenPayload>(token, process.env.REFRESH_SECRET ?? 'refresh secret key');
}
