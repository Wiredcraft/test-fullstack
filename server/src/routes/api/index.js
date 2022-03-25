"use strict";
const router = require("@koa/router")();

const userRouter = require("./users");
router.use(userRouter.routes(), userRouter.allowedMethods());

const authRouter = require("./auth");
router.use(authRouter.routes(), authRouter.allowedMethods());

const talkListRouter = require("./talkList");
router.use(talkListRouter.routes(), talkListRouter.allowedMethods());

module.exports = router;
