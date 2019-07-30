const { AuthenticationError } = require("../lib/errors")

module.exports = function(ctx, next) {
  console.log(ctx.state)
  ctx.assert(ctx.state.user, new AuthenticationError())
  return next()
}
