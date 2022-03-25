const Router = require("@koa/router");
const router = new Router();
const {
    TalkListController
} = require("../../controllers/talkList");

const {
    validate
} = require("../../middlewares/validator");
const talkListSchema = require("../../schemas/talkList");

router.prefix("/api/talkList");
router.post("/", validate(talkListSchema.reg), TalkListController.createTalk);
router.patch("/:id",TalkListController.patchTalk);
router.get("/:id", TalkListController.getTalk);
router.get("/", TalkListController.findTalk);

module.exports = router;