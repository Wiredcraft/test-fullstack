import { Prisma } from '@prisma/client';

import { BadRequestError } from '../../errors/bad-request.error';
import { HTTPError } from '../../errors/http.error';
import prisma from '../../utils/prisma';
import { updateTalk } from '../talks/talks.service';

// export async function queryVote(where: )

export async function getVote(where: Prisma.VoteWhereUniqueInput) {
  return prisma.vote.findUnique({ where });
}

export async function createVote(data: Prisma.VoteCreateInput) {
  const vote = await prisma.vote.create({ data });
  await updateTalk(vote.talkId, { voted: { increment: 1 } });
  return vote;
}

export async function updateVote(id: number, data: Prisma.VoteUpdateInput) {
  await existsVote({ id }, new BadRequestError(`The Vote of id: \`${id}\` not exists.`));

  const vote = await prisma.vote.update({ where: { id }, data });
  await updateTalk(vote.talkId, { voted: { [vote.active ? 'increment' : 'decrement']: 1 } });
  return vote;
}

export async function existsVote(where: Prisma.VoteWhereInput, throwIfNot?: HTTPError) {
  const result = (await prisma.vote.count({ where })) > 0;

  if (throwIfNot && !result) throw throwIfNot;

  return result;
}
