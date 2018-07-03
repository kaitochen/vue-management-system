const router = require('koa-router')()
const login = require('./login')
const users = require('./users')
const list = require('./list')



router.use('/login',login.routes(),login.allowedMethods());
router.use('/users',users.routes(),users.allowedMethods());
router.use('/list',list.routes(),list.allowedMethods());

module.exports = router;
