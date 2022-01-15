import ApiErrorType from '../enums/api-error-type';
import ExtendedError from '../interfaces/extended-errors';

/**
 * Give a message prefix according to an [[ApiErrorType]].
 *
 * @param {ApiErrorType} type - The type of error.
 *
 * @return {string} Error message prefix.
 */
const getTypeMessagePrefix: Function = (type: ApiErrorType): string => {
  switch (type) {
    case ApiErrorType.RouteError:
      return 'Route';
    case ApiErrorType.UserError:
      return 'User';
    case ApiErrorType.ValidationError:
      return 'Argument';
    default:
      return 'Generic';
  }
};

/**
 * Generate an error object from given parameters.
 * Can be generic and standalone, or to use with `express` server.
 *
 * @param {ApiErrorType} type - The type of error.
 * @param {string} details - For an Error object, detail can be `error.message`.
 * @param {number} code - The HTTP status code of the error.
 *
 * @return {ExtendedError} `Error` object with parameters applied.
 */
const generateError: Function = (
    type: ApiErrorType,
    details: string,
    code?: number,
): ExtendedError => {
  const status: number = code ? code : 400;
  const message: string = `${getTypeMessagePrefix(type)} error: ${details}`;
  const error: ExtendedError = Error(message);
  error.status = status;
  return (error);
};

export default generateError;
