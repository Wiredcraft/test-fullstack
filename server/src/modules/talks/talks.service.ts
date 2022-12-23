import { Prisma } from '@prisma/client';

import prisma from '../../utils/prisma';

export async function createTalk(data: Prisma.TalkCreateInput) {
  return prisma.talk.create({ data });
}

export async function getAllTalks(
  where: Prisma.TalkWhereInput,
  option?: Omit<Prisma.TalkFindManyArgs, 'where'>,
) {
  const results = await prisma.talk.findMany({ where, ...option });
  const total = await prisma.talk.count({ where });

  return { results, total };
}
