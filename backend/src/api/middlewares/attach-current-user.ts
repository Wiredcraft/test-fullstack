import {NextFunction, Request, RequestHandler, Response} from 'express';
import ApiErrorType from '../../enums/api-error-type';
import UserModel from '../../models/user';
import generateError from '../generate-error';
import handleErrors from './handle-errors';

/**
 * Middleware to attach user to the request.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 */
const attachCurrentUser: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    const userRecord = await UserModel.findById({
      _id: req.token?._id,
    });
    if (!userRecord) {
      return handleErrors(
          generateError(
              ApiErrorType.UserError,
              'Error while trying to request user.',
              401,
          ), req, res, next);
    }
    const currentUser = userRecord?.toObject();
    req.currentUser = currentUser;
    return next();
  } catch (error) {
    global.logger.error(error);
    handleErrors(
        generateError(
            ApiErrorType.UserError,
            'Error attaching user to the request.',
            500)
        , req, res, next);
  }
};

export default attachCurrentUser;
