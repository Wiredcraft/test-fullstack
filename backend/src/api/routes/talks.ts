import {NextFunction, Request, Response, Router as router} from 'express';
import ApiErrorType from '../../enums/api-error-type';
import ITalk from 'interfaces/ITalk';
import TalksService from '../../services/talks';
import attachCurrentUser from '../middlewares/attach-current-user';
import generateError from '../generate-error';
import handleErrors from '../middlewares/handle-errors';
import isAuth from '../middlewares/is-auth';
import validateParameters from '../middlewares/validate-parameters';

/**
 * Route to handle authentification mechanism.
 * @async
 * @param {router} appRouter - Express Router with routes applied.
 */
const talksRoute: Function = async (appRouter: router): Promise<void> => {
  const route: router = router();
  const talkService = new TalksService();

  appRouter.use('/talks', route);

  route.patch('/:talkID',
      isAuth,
      attachCurrentUser,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          if (req.token?.username) {
            await talkService.update(
                req.params.talkID,
                req.token._id,
                req.body.name ?? null,
                req.body.description ?? null,
            );

            res.json({
              'status': 'patched',
            });
          } else {
            throw Error('Error occured during talk update.');
          }
        } catch (error: any) {
          handleErrors(
              generateError(ApiErrorType.TalkError, error.message),
              req, res, next,
          );
        }
      });

  route.get('/list/:username?',
      isAuth,
      validateParameters,
      attachCurrentUser,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const talkServiceResponse =
            await talkService.list(req.params.username);

          res.json(talkServiceResponse);
        } catch (error: any) {
          handleErrors(
              generateError(ApiErrorType.TalkError, error.message),
              req, res, next,
          );
        }
      });

  route.delete('/:talkID',
      isAuth,
      validateParameters,
      attachCurrentUser,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          if (req.token?.username) {
            await talkService.remove(
                req.params.talkID,
                req.token._id,
            );

            res.json({
              'status': 'deleted',
            });
          } else {
            throw Error('Error occured during talk deletion.');
          }
        } catch (error: any) {
          handleErrors(
              generateError(ApiErrorType.TalkError, error.message),
              req, res, next,
          );
        }
      });

  route.get('/:talkID',
      isAuth,
      validateParameters,
      attachCurrentUser,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const talkServiceResponse =
            await talkService.get(req.params.talkID);

          return res.json(talkServiceResponse.shift());
        } catch (error: any) {
          handleErrors(
              generateError(ApiErrorType.TalkError, error.message),
              req, res, next,
          );
        }
      });

  route.post('/',
      isAuth,
      validateParameters,
      attachCurrentUser,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const {
            name,
            description,
          } = req.body;

          const talk: ITalk = {
            name,
            description,
          };
          const talkServiceResponse =
            await talkService.create(talk, req.currentUser?._id);
          res.json({
            'status': 'created',
            'id': talkServiceResponse._id,
          });
        } catch (error: any) {
          handleErrors(
              generateError(ApiErrorType.TalkError, error.message),
              req, res, next,
          );
        }
      });
};

export default talksRoute;