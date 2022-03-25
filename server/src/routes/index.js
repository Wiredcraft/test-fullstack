"use strict";
const router = require("@koa/router")();

const file = require("./api");
router.use(file.routes(), file.allowedMethods());

module.exports = router;
