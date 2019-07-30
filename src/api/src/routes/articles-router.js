const Router = require("koa-router")
const ctrl = require("../controllers").articles
const router = new Router()

const auth = require("../middleware/auth-required-middleware")

router.get("/articles", ctrl.get)
router.post("/articles", auth, ctrl.post)

module.exports = router.routes()
