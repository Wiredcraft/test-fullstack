const koaJwt = require("koa-jwt")
const config = require("config")

module.exports = koaJwt({
  getToken(ctx, opts) {
    const { authorization } = ctx.header

    if (authorization) {
      return authorization
    }

    return null
  },
  secret: config.get("secret"),
  passthrough: true,
  key: "jwt",
})
