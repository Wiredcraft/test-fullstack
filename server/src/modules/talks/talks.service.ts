import { Prisma } from '@prisma/client';

import prisma from '../../utils/prisma';

export async function getAllTalks(
  where: Prisma.TalkWhereInput,
  option?: Omit<Prisma.TalkFindManyArgs, 'where'>,
) {
  const results = await prisma.talk.findMany({
    where,
    include: { owner: { select: { id: true, username: true } } },
    ...option,
  });
  const total = await prisma.talk.count({ where });

  return { results, total };
}

export async function createTalk(data: Prisma.TalkCreateInput) {
  return prisma.talk.create({ data });
}

export async function updateTalk(id: number, data: Prisma.TalkUpdateInput) {
  return prisma.talk.update({ where: { id }, data });
}

export async function existsTalk(where: Prisma.TalkWhereInput) {
  return (await prisma.talk.count({ where })) > 0;
}
