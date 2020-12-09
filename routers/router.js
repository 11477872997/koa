const Router = require('koa-router');
const router = new Router({
    prefix: '/api' //统一加个前缀
});
const options = require('../server/user');


// 业务逻辑处理路由
router.post('/aa',options );



module.exports = router
