const router = require('koa-router')()
const { statics } = require('../services/api')

router.prefix('/api')
router.get('/statics', statics)

module.exports = router