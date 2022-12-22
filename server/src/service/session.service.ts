import { Prisma, Session, User } from '@prisma/client';

import prisma from '../utils/prisma';

export async function createSession(userId: User['id']) {
  return prisma.session.create({ data: { user: { connect: { id: userId } } } });
}

export async function getSession(where: Prisma.SessionWhereInput) {
  return prisma.session.findFirst({ where });
}

export async function getAllSessionsByUserId(userId: User['id']) {
  return prisma.session.findMany({ where: { user: { id: userId }, valid: true } });
}

export async function invalidSessionById(sessionId: Session['id']) {
  await prisma.session.update({ where: { id: sessionId }, data: { valid: false } });
}

export async function invalidSessionByUserId(userId: User['id']) {
  await prisma.session.updateMany({
    where: { user: { id: userId }, valid: true },
    data: { valid: false },
  });
}
