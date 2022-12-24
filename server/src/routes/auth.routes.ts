import { Router } from 'express';

import { deserializeUser } from '../middleware/deserialize-user';
import { requireUser } from '../middleware/require-user';
import { validateResource } from '../middleware/validate-request';
import {
  createSessionHandler,
  getSessionHandler,
  refreshSessionHandler,
  removeSessionHandler,
} from '../modules/auth/auth.controller';
import { loginSchema, logoutSchema } from '../modules/auth/auth.schema';

const router = Router();
const basePath = '/auth';

router
  .route(basePath)
  .post(validateResource(loginSchema), createSessionHandler)
  .get(deserializeUser, requireUser, getSessionHandler)
  .delete(deserializeUser, requireUser, validateResource(logoutSchema), removeSessionHandler);

router.post(`${basePath}/refresh`, refreshSessionHandler);

export default router;
