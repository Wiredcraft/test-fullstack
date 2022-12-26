import { Request, Response } from 'express';

import { UnauthorizedError } from '../../errors/unauthorized.error';

import { CreateTalkInput, QueryTalksInput } from './talks.schema';
import { createTalk, getAllTalks } from './talks.service';

/**
 * Create Talk Controller
 * @param req
 * @param res
 */
export async function createTalkHandler(
  req: Request<unknown, unknown, CreateTalkInput['body']>,
  res: Response,
) {
  const { user } = req;
  if (user == null) {
    throw new UnauthorizedError();
  }

  const talk = await createTalk({
    ...req.body,
    owner: { connect: { id: user.id } },
  });
  res.success(talk);
}

/**
 * Query Talks Controller
 * @param req
 * @param res
 */
export async function queryTalksHandler(
  req: Request<unknown, unknown, unknown, QueryTalksInput['query']>,
  res: Response,
) {
  const { user } = req;
  const { where, take, skip, orderBy, ...params } = req.query;

  if (where?.my && user == null) {
    // When query user's own talks but not logged in, throw unauthorized error
    throw new UnauthorizedError();
  }

  const { results, total } = await getAllTalks(
    { ownerId: where?.my ? user?.id : undefined },
    {
      ...params,
      // TODO The variable type from query is always string, should find some way to auto convert
      take: Number(take),
      skip: Number(skip),
      orderBy: orderBy && Object.entries(orderBy).map(([key, value]) => ({ [key]: value })),
    },
  );
  res.success({ results, total });
}
