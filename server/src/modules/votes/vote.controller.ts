import { Request, Response } from 'express';

import { NotFoundError } from '../../errors/not-found.error';
import { UnauthorizedError } from '../../errors/unauthorized.error';
import { existsTalk } from '../talks/talks.service';

import { CreateVoteInput, QueryVoteInput, UpdateVoteInput } from './vote.schema';
import { createVote, existsVote, getVote, updateVote } from './vote.service';

export async function createVoteHandler(
  req: Request<object, object, CreateVoteInput['body']>,
  res: Response,
) {
  const { user } = req;
  if (user == null) throw new UnauthorizedError();

  const { talkId } = req.body;
  if (!(await existsTalk({ id: talkId }))) {
    throw new NotFoundError(`The talk of id \`${talkId}\` not exists.`);
  }

  const vote = await createVote({
    talk: { connect: { id: talkId } },
    owner: { connect: { id: user.id } },
  });
  res.success(vote);
}

export async function updateVoteHandler(
  req: Request<object, object, UpdateVoteInput['body']>,
  res: Response,
) {
  const { user } = req;
  if (user == null) throw new UnauthorizedError();

  const { id, ...data } = req.body;
  if (!(await existsVote({ id }))) {
    throw new NotFoundError(`The vote of id \`${id}\` not exists.`);
  }

  const vote = await updateVote(id, data);
  res.success(vote);
}

export async function queryVoteHandler(
  req: Request<unknown, unknown, unknown, QueryVoteInput['query']>,
  res: Response,
) {
  const { user } = req;
  if (user == null) throw new UnauthorizedError();

  const { talkId, ownerId } = req.query;
  const vote = await getVote({
    talkId_ownerId: { talkId: Number(talkId), ownerId: Number(ownerId) },
  });

  res.success(vote);
}
