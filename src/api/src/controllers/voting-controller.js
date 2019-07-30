const humps = require("humps")
const { ValidationError } = require("../lib/errors")
const db = require("../lib/db")
const isUUID = require("validator/lib/isUUID")

module.exports = {

  async post(ctx) {
    const { body } = ctx.request
    let { voting = {} } = body
    const opts = { abortEarly: false }

    const { articleId = '' } = voting
    const authorId = ctx.state.user.id

    ctx.assert(
      isUUID(authorId) && isUUID(articleId),
      422,
      new ValidationError(["The authorId and the articleId are required"], "", "invalid fields"),
    )

    const findArticle = await db("articles")
      .first()
      .where({ id: articleId })

    if (!findArticle) {
      ctx.assert(
        false,
        422,
        new ValidationError(["article not found"], "", "invalid fields"),
      )
    }

    const didVote = await db("voting")
      .first().where({ articleid: articleId, authorid: authorId })

    if (didVote) {
      ctx.assert(
        false,
        422,
        new ValidationError(["You've already voted for this one"], "", "invalid fields"),
      )
    }

    const votingData = {
      articleid: articleId,
      authorid: authorId,
    }

    await db("voting").insert(
      humps.decamelizeKeys(votingData),
    )

    ctx.body = { voting: votingData }
  },

}
