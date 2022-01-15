import {NextFunction, Request, RequestHandler, Response} from 'express';
import ApiErrorType from '../../enums/api-error-type';
import Joi from 'joi';
import generateError from '../generate-error';
import handleErrors from './handle-errors';

/**
 * Get an `Joi.ObjectSchema` (validator schema)
 * according the user route to validate
 * the parameters inside an request.
 *
 * @param {Request} req - Express request object.
 *
 * @return {Joi.ObjectSchema} Schema corresponding to the current route.
 */
const getObjectSchema: Function = (req: Request): Joi.ObjectSchema => {
  const constraints = {};
  return Joi.object(constraints);
};

/**
 * Middleware to validate the API parameters of the HTTP request.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 */
const validateParameters:
    RequestHandler = (req: Request, res: Response, next: NextFunction) => {
      const schema: Joi.ObjectSchema = getObjectSchema(req);
      const validation = schema.validate(req.body);

  validation.error ? handleErrors(
      generateError(
          ApiErrorType.ValidationError,
          validation.error.details.shift()?.message ?? 'Validation error',
      ), req, res, next,
  ) : next();
    };

export default validateParameters;
