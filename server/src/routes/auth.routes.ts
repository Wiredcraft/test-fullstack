import express from 'express';

import { createSessionHandler, refreshSessionHandler } from '../modules/auth/auth.controller';
import { validateResource } from '../middleware/validate-request';
import { loginSchema } from '../modules/auth/auth.schema';

const router = express.Router();
const basePath = '/auth';

router.post(`${basePath}/sessions`, validateResource(loginSchema), createSessionHandler);
router.post(`${basePath}/sessions/refresh`, refreshSessionHandler);

export default router;
