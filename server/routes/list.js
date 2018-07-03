const router = require('koa-router')()
const ListController = require('../controller/List/ListController');
const addListController = require('../controller/List/addListController')
const updateListController = require('../controller/List/updateListController')
const deleteListController = require('../controller/List/deleteListController')


router.get('/List',ListController);
router.post('/addList',addListController)
router.post('/updateList/:id',updateListController)
router.delete('/deleteList/:id',deleteListController)

module.exports = router;