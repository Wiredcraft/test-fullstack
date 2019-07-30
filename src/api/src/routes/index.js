const Router = require("koa-router")
const router = new Router()
const api = new Router()

const users = require("./users-router")
const articles = require("./articles-router")
const voting = require('./voting-router')

api.use(users)
api.use(articles)
api.use(voting)

router.use("/api", api.routes())

module.exports = router
