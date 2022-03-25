const Router = require("@koa/router");
const router = new Router();
const { AuthController } = require("../../controllers/auth");

router.prefix("/api/auth");
router.post("/", AuthController.postUserAuth);

module.exports = router;
