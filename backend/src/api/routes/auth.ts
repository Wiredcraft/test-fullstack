import {NextFunction, Request, Response, Router as router} from 'express';
import ApiErrorType from '../../enums/api-error-type';
import AuthService from '../../services/auth';
import {IUserInputDTO} from '../../interfaces/IUser';
import generateError from '../generate-error';
import handleErrors from '../middlewares/handle-errors';
import validateParameters from '../middlewares/validate-parameters';

/**
 * Route to handle authentification mechanism.
 * @param {router} appRouter - Express Router with routes applied.
 */
const authRoute: Function = (appRouter: router): void => {
  const route: router = router();
  const authService: AuthService = new AuthService();

  appRouter.use('/auth', route);

  route.post(
      '/register',
      validateParameters,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const register = await authService.register(
            req.body as IUserInputDTO,
          );
          if (!register) {
            handleErrors(
                generateError(
                    ApiErrorType.UserError,
                    'Cannot sign-up. User already exists?',
                ),
                req, res, next,
            );
            return;
          }
          const {token, user} = register;
          return res.status(201).json({token, id: user._id});
        } catch (error: any) {
          handleErrors(
              generateError(ApiErrorType.UserError, error.message),
              req, res, next,
          );
        }
      },
  );

  route.post(
      '/login',
      validateParameters,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const {username, password} = req.body;
          const login: {user: IUser; token: string} =
          if (!login) {
            handleErrors(
                generateError(
                    ApiErrorType.UserError,
                    'Problem while logging in. Are the credentials valid?',
                ),
                req, res, next,
            );
            return;
          }
          const {token, user} = login;
          return res.json({token, id: user._id}).status(200);
        } catch (error: any) {
          handleErrors(
              generateError(ApiErrorType.UserError, error.message),
              req, res, next,
          );
        }
      },
  );
};

export default authRoute;
