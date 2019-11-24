const { validateToken } = require('../utils/token-utils');
const { LogicError } = require('../errors/logic-error');

const AUTH_HEADER_REGEX = /(token|bearer)\s/i;

const auth = async (ctx, next) => {
  // Get access token from header
  let accessToken = ctx.headers['authorization'];
  if (!(accessToken && AUTH_HEADER_REGEX.test(accessToken))) {
    throw new LogicError(1102);
  }

  accessToken = accessToken.replace(AUTH_HEADER_REGEX, '');

  console.log(accessToken);
  const userData = validateToken(accessToken);
  // TODO: if expired, return corresponding message
  if (!userData.login) {
    throw new LogicError(1101);
  }
  ctx.state.user = userData;

  // Add jwt payload (like login) into jwtPayload property

  await next();
};

module.exports.auth = auth;
