import { Prisma, User } from '@prisma/client';
import md5 from 'md5';

import { BadRequestError } from '../../errors/bad-request.error';
import { HTTPError } from '../../errors/http.error';
import prisma from '../../utils/prisma';

const select = {
  id: true,
  username: true,
}; // Prisma.UserSelect

export async function existsUser(where: Prisma.UserWhereInput, throwIfNot?: HTTPError) {
  const result = (await prisma.user.count({ where })) > 0;

  if (throwIfNot && !result) throw throwIfNot;

  return result;
}

export async function getUser(where: Prisma.UserWhereInput) {
  return prisma.user.findFirst({ where, select });
}

export async function createUser(data: Prisma.UserCreateInput) {
  const { username, password, ...restData } = data;
  await existsUser({ username }, new BadRequestError('The username exists, please try another.'));

  return prisma.user.create({ data: { ...restData, username, password: md5(password) }, select });
}

export async function updateUser(id: number, data: Prisma.UserUpdateInput) {
  await existsUser({ id }, new BadRequestError(`The User of id: \`${id}\` not exists.`));

  return prisma.user.update({ where: { id }, data, select });
}

export async function getUserByPassword(data: Pick<User, 'username' | 'password'>) {
  const { username, password } = data;

  return getUser({ username, password: md5(password) });
}
