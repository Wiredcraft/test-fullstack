import { Request, Response } from 'express';

import { BadRequestError } from '../../errors/bad-request.error';
import { NotFoundError } from '../../errors/not-found.error';
import { UnauthorizedError } from '../../errors/unauthorized.error';
import { existsTalk } from '../talks/talks.service';

import { CreateVoteInput, QueryVoteInput, UpdateVoteInput } from './vote.schema';
import { createVote, existsVote, getVote, updateVote } from './vote.service';

/**
 * Create Vote Controller
 * @param req
 * @param res
 */
export async function createVoteHandler(
  req: Request<unknown, unknown, CreateVoteInput['body']>,
  res: Response,
) {
  const { user } = req;
  if (user == null) {
    throw new UnauthorizedError();
  }

  const { talkId } = req.body;
  await existsTalk({ id: talkId }, new NotFoundError(`The talk of id \`${talkId}\` not exists.`));

  const exists = await existsVote({ talkId, ownerId: user.id });
  if (exists) {
    throw new BadRequestError(`The user has already voted before.`);
  }

  const vote = await createVote({
    talk: { connect: { id: talkId } },
    owner: { connect: { id: user.id } },
  });
  res.success(vote);
}

/**
 * Update Vote Controller
 * @param req
 * @param res
 */
export async function updateVoteHandler(
  req: Request<unknown, unknown, UpdateVoteInput['body']>,
  res: Response,
) {
  const { user } = req;
  if (user == null) {
    throw new UnauthorizedError();
  }

  const { id, ...data } = req.body;
  if (!(await existsVote({ id }))) {
    throw new NotFoundError(`The vote of id \`${id}\` not exists.`);
  }

  const vote = await updateVote(id, data);
  res.success(vote);
}

/**
 * Query User's Vote Controller
 * @param req
 * @param res
 */
export async function queryVoteHandler(
  req: Request<unknown, unknown, unknown, QueryVoteInput['query']>,
  res: Response,
) {
  const { user } = req;
  if (user == null) {
    throw new UnauthorizedError();
  }

  const { talkId } = req.query;
  const vote = await getVote({
    talkId_ownerId: { talkId: Number(talkId), ownerId: user.id },
  });

  res.success(vote);
}
