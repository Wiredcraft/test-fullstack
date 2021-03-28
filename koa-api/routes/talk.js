const router = require('koa-router')()
const talkController = require('../controllers/talk.js')

router.get('/talk', talkController.talkAll)
router.get('/talk/:id', talkController.talkSingle)
router.post('/talk', talkController.talkAdd)
router.put('/talk/:id', talkController.talkEdit)
module.exports = router