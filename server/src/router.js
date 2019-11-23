const Router = require('@koa/router');

const { login } = require('./modules/login');
const { talks } = require('./modules/talks');

const router = new Router();

router.use('/login', login.routes());
router.use('/talks', talks.routes());

module.exports.router = router;
