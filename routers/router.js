const Router = require('koa-router');
const router = new Router({
    prefix: '/api' //统一加个前缀
});
const options = require('../server/user');
const reginters = require('../server/login/register');
const login = require('../server/login/login');
const verify = require('../server/login/verification');


// 业务逻辑处理路由
router.get('/aa',options);

//注册
router.post('/reginters',reginters);
// 登录
router.post('/login',login);
//验证
router.post('/verify',verify);





module.exports = router
