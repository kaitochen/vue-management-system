const router = require('koa-router')()
const LoginController = require('../controller/Login/LoginController')


router.post('/Login',LoginController)

module.exports = router;