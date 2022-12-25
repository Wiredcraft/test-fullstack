import { Request, Response } from 'express';

import { UnauthorizedError } from '../../errors/unauthorized.error';

import { CreateTalkInput, QueryTalksInput } from './talks.schema';
import { createTalk, getAllTalks } from './talks.service';

export async function createTalkHandler(
  req: Request<object, object, CreateTalkInput['body']>,
  res: Response,
) {
  const { user } = req;
  if (user == null) throw new UnauthorizedError();

  const talk = await createTalk({ ...req.body, owner: { connect: { id: user.id } } });
  res.success(talk);
}

export async function queryTalksHandler(req: Request<QueryTalksInput['body']>, res: Response) {
  const { user } = req;
  const { where, ...params } = req.params;

  if (where?.my && user == null) throw new UnauthorizedError();

  const { results, total } = await getAllTalks(
    { ownerId: where?.my ? user?.id : undefined },
    params,
  );
  res.success({ results, total });
}
