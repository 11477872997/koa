// const {registerUser,insertUser}=require('../../sql/login/register');
const logsUtil = require('../../config/logs');
const { loginUser } = require('../../sql/login/login')
const md5 = require('../../config/md5');
//引入jwt做token验证
const jwt = require('jsonwebtoken');
//统一设置token有效时间  为了方便观察，设为10s
const expireTime = 60 * 60 * 24 // 24小时过期
// const expireTime = '5s' // 24小时过期

const login = async (ctx, next) => {
    let req = ctx.request.body;
    logsUtil.logResponse(ctx, req);	  //记录响应日志
    if (!req.name || !req.password) {   //密码账号不能为空
        ctx.response.status = 200;
        ctx.body = {
            code: -1,
            text: '密码或账号不能为空！'
        }
    } else {
        let md5Pass = md5.MD5(req.password);
        let date = await loginUser(req.name, md5Pass); //是否存在查询用户
        if (Array.prototype.isPrototypeOf(date) && date.length === 0) {
            ctx.body = {
                code: '-1',
                desc: '该用户尚未注册'
            }
        } else {
            if (md5Pass == date[0].password) {
                //生成token，验证登录有效期
                const token = jwt.sign({
                    user: req.name,
                    passWord: md5Pass
                }, '123456', { expiresIn: expireTime });
                ctx.body = {
                    code: '0',
                    token: token,
                    row: req.name,
                    desc: '登陆成功'
                }
            } else {
                ctx.body = {
                    code: '-1',
                    desc: '用户密码错误'
                }
            }
        }
    }

}
module.exports = login