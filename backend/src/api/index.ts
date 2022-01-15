import authRoute from './routes/auth';
import {Router as router} from 'express';
import secureRoute from './routes/secure';

/**
 * Creation of a Router with routes applied.
 *
 * @async
 * @return {router} Express Router with routes applied.
 */
const initAppRouter: Function = async (): Promise<router> => {
  const appRouter: router = router();

  authRoute(appRouter);
  secureRoute(appRouter);

  return appRouter;
};

export default initAppRouter;
