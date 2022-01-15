import {NextFunction, Request, RequestHandler, Response} from 'express';
import ApiErrorType from '../../enums/api-error-type';
import generateError from '../generate-error';
import handleErrors from '../middlewares/handle-errors';

/**
 * Middleware in use when a requested route is not existent.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 */
const notFound: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  handleErrors(
      generateError(
          ApiErrorType.RouteError,
          `${req.path} doesn't exist`
          , 404,
      ), req, res, next);
};

export default notFound;
