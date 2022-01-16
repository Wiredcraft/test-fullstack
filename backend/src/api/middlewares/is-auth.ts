import jwt, {GetTokenCallback, RequestHandler} from 'express-jwt';
import {Request} from 'express';
import environment from '../../lib/environment';

/**
 * Extract the `authorization` token from the request headers.
 * (eg: authorization: `Bearer <token>`)
 *
 * @param {Request} req - Express request object.
 * @return {string | null} - Token extracted from the request headers.
 */
const getTokenFromHeader: GetTokenCallback = (req: Request): string | null => {
  if (
    (
      req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Token'
    ) ||
    (
      req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    )
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

/**
 * Call JSON Web Tokens middleware from request.
 * (eg: authorization: `Bearer <token>`)
 */
const isAuth: RequestHandler = jwt({
  algorithms: ['HS256'],
  secret: environment.getEnvironment().JWT_SECRET,
  userProperty: 'token',
  getToken: getTokenFromHeader,
});

export default isAuth;
