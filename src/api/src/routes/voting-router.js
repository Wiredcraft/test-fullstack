const Router = require("koa-router")
const ctrl = require("../controllers").voting
const router = new Router()

const auth = require("../middleware/auth-required-middleware")

router.post("/voting", auth, ctrl.post)

module.exports = router.routes()
