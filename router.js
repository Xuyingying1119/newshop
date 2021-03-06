//集合所有的路由  具体路由业务在controllers
const express = require('express')
const router = express.Router()
const home = require('./controllers/home')
const account = require('./controllers/account')
const product = require('./controllers/product')


router.get('/',home.index)//渲染首页
router.get('/like',home.like)//返回json猜你喜欢

// RESTful 规则 /list/7 ===> requestAnimationFrame.params.id
// get 方式 /list?id=7 ===> req.querey.id
router.get('/list/:id', product.list)//渲染分类下的商品列表

router.get('/login', account.login)

//exports=module.exports; exports = router ;
//exports 不能导出单个内容,而 module.exports 可以导出单个内容
module.exports = router