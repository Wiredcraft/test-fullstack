const humps = require("humps")
const uuid = require("uuid")
const bcrypt = require("bcrypt")
const { ValidationError } = require("../lib/errors")
const { generateJWTforUser } = require("../lib/utils")
const db = require("../lib/db")

module.exports = {
  async get(ctx) {
    const user = generateJWTforUser(ctx.state.user)

    ctx.body = { user }
  },

  async post(ctx) {
    const { body } = ctx.request
    let { user = {} } = body
    const opts = { abortEarly: false, context: { validatePassword: true } }

    user.id = uuid()

    user = await ctx.app.schemas.user.validate(user, opts)

    user.password = await bcrypt.hash(user.password, 10)

    await db("users").insert(humps.decamelizeKeys(user))

    user = generateJWTforUser(user)
    delete user.password
    ctx.body = { user }
  },

  async login(ctx) {
    const { body } = ctx.request
    const pUser = (typeof body.user === 'object' && body.user) ? body.user : {}

    ctx.assert(
      pUser.username && pUser.password,
      422,
      new ValidationError(["either username or password is missing or empty"], "", "invalid fields"),
    )

    let user = await db("users")
      .first()
      .where({ username: pUser.username })

    ctx.assert(
      user,
      401,
      new ValidationError(["invalid fields"], "", "username is not found"),
    )

    const isValid = await bcrypt.compare(pUser.password, user.password)

    ctx.assert(
      isValid,
      401,
      new ValidationError(["is invalid"], "", "password is incorrect"),
    )

    user = generateJWTforUser(user)
    delete user.password
    ctx.body = { user }
  },
}
