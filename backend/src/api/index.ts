import authRoute from './routes/auth';
import {Router as router} from 'express';

/**
 * Creation of a Router with routes applied.
 *
 * @async
 * @return {router} Express Router with routes applied.
 */
const initAppRouter: Function = async (): Promise<router> => {
  const appRouter: router = router();

  authRoute(appRouter);

  return appRouter;
};

export default initAppRouter;
