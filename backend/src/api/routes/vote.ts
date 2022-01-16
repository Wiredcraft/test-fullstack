import {NextFunction, Request, Response, Router as router} from 'express';
import ApiErrorType from '../../enums/api-error-type';
import VotesService from '../../services/votes';
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
const voteRoute: Function = async (appRouter: router): Promise<void> => {
  const route: router = router();
  const voteService = new VotesService();

  appRouter.use('/vote', route);

  route.post('/',
      isAuth,
      validateParameters,
      attachCurrentUser,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          if (req.token?.username) {
            const {talkID, vote} = req.body;

            voteService.vote(vote, req.token?._id, talkID);
            res.json({status: 'voted', vote: vote, talkID});
          } else {
            throw Error('Error occured during vote.');
          }
        } catch (error: any) {
          handleErrors(
              generateError(ApiErrorType.VoteError, error.message),
              req, res, next,
          );
        }
      });
};

export default voteRoute;
