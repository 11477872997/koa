//解析token
const tools = require('../../config/tool');
const logsUtil = require('../../config/logs');
const { registerUser } = require('../../sql/login/register');
const md5 = require('../../config/md5');


const verify = async (ctx, next) => {
    const req = ctx.request.body;
    const token = ctx.headers.authorization;
    if (token) {
        try {
            let choose = 0;
            const result = await tools.verToken(token);
            let date = await registerUser(choose, req.name);
            console.log(date[0].name)
            if (!req.name) {
                ctx.body = {
                    code: '-1',
                    desc: '参数错误'
                }
            } else {
                if (req.name == date[0].name) {
                    ctx.body = {
                        code: '0',
                        row: date,
                        desc: '获取用户信息成功'
                    }
                }
            }
        } catch (error) {
            ctx.status = 401;
            ctx.body = {
                code: '-1',
                desc: '登陆过期，请重新登陆'
            }
        }
    } else {
        ctx.status = 401;
        ctx.body = {
            code: '-1',
            desc: '登陆过期，请重新登陆'
        }
    }

}

module.exports = verify