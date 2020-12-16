const { registerUser, insertUser } = require('../../sql/login/register');
const logsUtil = require('../../config/logs');
const md5 = require('../../config/md5');
const reginters = async (ctx, next) => {
    let req = ctx.request.body;
    if (req.name && req.password) {
        let choose = 0;
        let data = await registerUser(choose, req.name);
        if (data[0].name === req.name) { //判断传进来的用户是否存在库里
            ctx.response.status = 200;
            ctx.body = {
                code: -1,
                desc: '用户已经存在'
            }
        } else {
            let md5Pass = md5.MD5(req.password);
            // console.log(typeof md5Pass)
            await insertUser(req.name, md5Pass);
            let choose = 1;
            let datas = await registerUser(choose, req.name, md5Pass);
            ctx.response.status = 200;
            ctx.body = {
                code: -1,
                row: datas,
                desc: '注册成功'
            }
        }
        logsUtil.logResponse(ctx, req);	  //记录响应日志
    } else {
        ctx.response.status = 416;
        ctx.body = {
            code: -1,
            desc: '参数不齐全'
        }
    }
}

module.exports = reginters