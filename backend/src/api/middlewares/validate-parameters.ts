import {NextFunction, Request, RequestHandler, Response} from 'express';
import ApiErrorType from '../../enums/api-error-type';
import Joi from 'joi';
import generateError from '../generate-error';
import handleErrors from './handle-errors';

/**
 * Validate the API parameters of an HTTP request.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 */
const validateParameters:
 RequestHandler = (req: Request, res: Response, next: NextFunction) => {
   const schema: Joi.ObjectSchema = getObjectSchema(req);
   const validation: Joi.ValidationResult = schema.validate(req.body);

   validation.error ? handleErrors(
       generateError(
           ApiErrorType.ValidationError,
           validation.error.details.shift()?.message ?? 'Validation error',
       ), req, res, next,
   ) : next();
 };

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
  let constraints = {};

  if (req.baseUrl.endsWith('/auth')) {
    constraints = {
      username: Joi.string().required(),
      password: Joi.string().required(),
    };
  } else if (req.baseUrl.endsWith('/vote')) {
    constraints = {
      talk_id: Joi.string().required(),
      vote: Joi.number().min(-1).max(+1).required(),
    };
  } else if (req.baseUrl.endsWith('/talks') && req.method === 'POST') {
    constraints = {
      name: Joi.string().required(),
      description: Joi.string().required(),
    };
  }
  return Joi.object(constraints);
};


export default validateParameters;
