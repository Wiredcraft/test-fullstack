import express from 'express';

import { createSessionHandler, refreshSessionHandler } from '../controller/auth.controller';
import { validateResource } from '../middleware/validate-request';
import { loginSchema } from '../schema/auth.schema';

const router = express.Router();

router.post('/sessions', validateResource(loginSchema), createSessionHandler);
router.post('/session/:id/refresh', refreshSessionHandler);

export default router;
