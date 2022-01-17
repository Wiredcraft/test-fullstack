import IUser, {IUserInputDTO} from '../../interfaces/IUser';
import {NextFunction, Request, Response, Router as router} from 'express';
import ApiErrorType from '../../enums/api-error-type';
import AuthService from '../../services/auth';
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

  route.post('/register', validateParameters,
      async (req: Request, res: Response, next: NextFunction) => {
        const errorMessage: string = generateError(
            ApiErrorType.AuthError,
            'Cannot sign-up. User already exists?',
        );
        try {
          const register: {user: IUser; token: string} =
            await authService.register(req.body as IUserInputDTO);
          if (!register) {
            handleErrors(errorMessage, req, res, next);
            return;
          }
          const {token, user} = register;
          return res.status(201).json({
            token,
            id: user._id,
            username: user.username,
          });
        } catch (error: any) {
          handleErrors(errorMessage, req, res, next);
        }
      },
  );

  route.post('/login', validateParameters,
      async (req: Request, res: Response, next: NextFunction) => {
        const errorMessage: string = generateError(
            ApiErrorType.AuthError,
            'Problem while logging in. Are the credentials valid?',
        );

        try {
          const {username, password} = req.body;
          const login: {user: IUser; token: string} =
          await authService.login(username, password);
          if (!login) {
            handleErrors(errorMessage, req, res, next);
            return;
          }
          const {token, user} = login;
          return res.json({
            token,
            id: user._id,
            username: user.username,
          }).status(200);
        } catch (error: any) {
          handleErrors(errorMessage, req, res, next);
        }
      },
  );
};

export default authRoute;
