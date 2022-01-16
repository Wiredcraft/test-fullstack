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
 * Route to perform CRUD operations on talks.
 *
 * @async
 *
 * @param {router} appRouter - Express Router with routes applied.
 */
const talksRoute: Function = async (appRouter: router): Promise<void> => {
  const route: router = router();
  const talkService: TalksService = new TalksService();

  appRouter.use('/talks', route);

  route.patch('/:talk_id', isAuth, attachCurrentUser,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          if (req.token?.username) {
            await talkService.update(
                req.params.talk_id,
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
          const talkServiceResponse: any[] =
            await talkService.list(req.params.username);

          res.json(talkServiceResponse);
        } catch (error: any) {
          handleErrors(
              generateError(ApiErrorType.TalkError,
                  'Error occured during user talk fetching.',
              ),
              req, res, next,
          );
        }
      });

  route.delete('/:talk_id', isAuth, validateParameters, attachCurrentUser,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          if (req.token?.username) {
            await talkService.remove( req.params.talk_id, req.token._id);
            res.json({'status': 'deleted'});
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

  route.get('/:talk_id', isAuth, validateParameters, attachCurrentUser,
      async (req: Request, res: Response, next: NextFunction) => {
        const errorMessage = generateError(
            ApiErrorType.TalkError,
            'Error occured during individual talk fetching.',
        );

        try {
          const talkServiceResponse: any =
            await talkService.get(req.params.talk_id);

          if (talkServiceResponse.length === 0) {
            handleErrors(errorMessage, req, res, next);
            return;
          }

          return res.json(talkServiceResponse.shift());
        } catch (error: any) {
          handleErrors(errorMessage, req, res, next);
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
              generateError(
                  ApiErrorType.TalkError,
                  'Error occured during talk creation.',
              ),
              req, res, next,
          );
        }
      });
};

export default talksRoute;
