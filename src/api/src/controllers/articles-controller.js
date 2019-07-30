const slug = require("slug")
const uuid = require("uuid")
const humps = require("humps")
const { ValidationError } = require("../lib/errors")
const db = require("../lib/db")
const { getSelect } = require("../lib/utils")
const {
  articleFields,
  userFields,
  votingField,
  relationsMaps,
} = require("../lib/relations-map")

module.exports = {

  async get(ctx) {
    const { user } = ctx.state
    const { offset, limit, author } = ctx.query

    let articlesQuery = db("articles")
      .select(
        ...getSelect("articles", "article", articleFields),
        ...getSelect("users", "author", userFields),
      )
      .limit(limit)
      .offset(offset)
      .orderBy("articles.created_at", "desc")

    let countQuery = db("articles").count()

    articlesQuery = articlesQuery
      .leftJoin("users", "articles.author", "users.id")

    let [articles, [countRes]] = await Promise.all([articlesQuery, countQuery])

    let articlesCount = countRes.count || countRes["count(*)"]
    articlesCount = Number(articlesCount)

    for (let i = 0; i < articles.length; i++) {
      const aItem = articles[i]
      const fc = aItem.article_id
      let votingQuery = db("voting").where('articleid', fc).count()
      const qRes = await Promise.all([votingQuery])
      let [[tResult]] = qRes
      let tCount = tResult.count || tResult["count(*)"]
      aItem.upvotes = tCount
    }

    articles.sort((aItem, bItem) => bItem.upvotes - aItem.upvotes)
    ctx.body = { articles, articlesCount }
  },

  async post(ctx) {
    const { body } = ctx.request
    let { article = {} } = body
    const opts = { abortEarly: false }

    article.id = uuid()
    article.author = ctx.state.user.id

    article = await ctx.app.schemas.article.validate(article, opts)

    article.slug = slug(article.title, { lower: true })

    try {
      await db("articles").insert(
        humps.decamelizeKeys(article),
      )
    } catch (err) {
      ctx.assert(
        parseInt(err.errno, 10) === 19 || parseInt(err.code, 10) === 23505,
        err,
      )

      article.slug = article.slug + "-" + uuid().substr(-6)

      await db("articles").insert(
        humps.decamelizeKeys(article),
      )
    }


    article.author = ctx.state.user.username

    ctx.body = { article }
  },

}
