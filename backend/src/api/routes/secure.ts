import {NextFunction, Request, Response, Router as router} from 'express';
import attachCurrentUser from '../middlewares/attach-current-user';
import isAuth from '../middlewares/is-auth';

/**
 * Route to handle authentification mechanism.
 * @param {router} appRouter - Express Router with routes applied.
 */
const secureRoute: Function = (appRouter: router): void => {
  const route: router = router();

  appRouter.use('/secure', route);

  route.get(
      '/user',
      isAuth,
      attachCurrentUser,
      (
          req: Request, res: Response, _next: NextFunction,
      ) => {
        res.json({user: req.currentUser});
      });
};

export default secureRoute;
