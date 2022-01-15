import {ErrorRequestHandler, NextFunction, Request, Response} from 'express';
import ExtendedError from '../../interfaces/extended-errors';

/**
 * Middleware to handle and give appropriates response to errors.
 *
 * @param {ExtendedError} err - Error response to handle.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} _next - Express next middleware function.
 */
const handleErrors: ErrorRequestHandler = (
    err: ExtendedError,
    req: Request,
    res: Response,
    _next: NextFunction,
): void => {
  const status: number = err.status || 500;
  const message: string = err.message;

  res.status(status);
  res.json({error: {message}});
  res.end();
};

export default handleErrors;
