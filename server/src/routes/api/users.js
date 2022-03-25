const Router = require("@koa/router");
const router = new Router();
const {
    UserController
} = require("../../controllers/user");

const {
    validate
} = require("../../middlewares/validator");
const userSchema = require("../../schemas/user");

router.prefix("/api/user");
router.post("/reg", validate(userSchema.reg), UserController.register);
router.get("/:id", UserController.getUserInfo);

module.exports = router;