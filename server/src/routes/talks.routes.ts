import { Router } from 'express';

import { deserializeUser } from '../middleware/deserialize-user';
import { requireUser } from '../middleware/require-user';
import { validateResource } from '../middleware/validate-request';
import { createTalkHandler, queryTalksHandler } from '../modules/talks/talks.controller';
import { createTalkSchema, queryTalksSchema } from '../modules/talks/talks.schema';

const router = Router();
const basePath = '/talks';

router
  .route(basePath)
  .all(deserializeUser, requireUser)
  .get(validateResource(queryTalksSchema), queryTalksHandler)
  .post(validateResource(createTalkSchema), createTalkHandler);

export default router;
