import { Router } from 'express';

import { deserializeUser } from '../middleware/deserialize-user';
import { requireUser } from '../middleware/require-user';
import { validateResource } from '../middleware/validate-request';
import {
  createVoteHandler,
  queryVoteHandler,
  updateVoteHandler,
} from '../modules/votes/vote.controller';
import { createVoteSchema, queryVoteSchema, updateVoteSchema } from '../modules/votes/vote.schema';

const router = Router();
const basePath = '/votes';

router
  .route(basePath)
  .get(deserializeUser, requireUser, validateResource(queryVoteSchema), queryVoteHandler)
  .post(deserializeUser, requireUser, validateResource(createVoteSchema), createVoteHandler)
  .patch(deserializeUser, requireUser, validateResource(updateVoteSchema), updateVoteHandler);

export default router;
