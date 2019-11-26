const { validateToken } = require('../utils/token-utils');
const { LogicError } = require('../errors/logic-error');

const AUTH_HEADER_REGEX = /(token|bearer)\s/i;

const auth = ({ required = true } = {}) => {
  return async (ctx, next) => {
    // Get access token from header
    let accessToken = ctx.headers['authorization'];

    if (accessToken && AUTH_HEADER_REGEX.test(accessToken)) {
      accessToken = accessToken.replace(AUTH_HEADER_REGEX, '');

      try {
        const userData = validateToken(accessToken);
        // TODO: if expired, return corresponding message
        if (!userData.username) {
          throw new LogicError(1101);
        }
        ctx.state.user = userData;
      } catch (err) {
        if (required) {
          throw new LogicError(1103);
        }
      }
    } else if (required) {
      // If required, but no access token, throw
      throw new LogicError(1102);
    }

    // Add jwt payload (like login) into jwtPayload property

    await next();
  };
};

module.exports.auth = auth;
