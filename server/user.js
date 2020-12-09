const sql=require('../sql/users')
const logsUtil=require('../config/logs')

const options = async (ctx,next)=>{
  console.log(ctx.query);
  let postObj = ctx.request.body
  // console.log(postObj)

  // console.log(ctx.request.body)
  
     await sql()
     .then((result) => {
      const start = new Date();					          // 响应开始时间
      let intervals;								              // 响应间隔时间
           next();
          intervals = new Date() - start;
        
          ctx.body = {
            status: 200,
            msg: result
          }
          logsUtil.logResponse(ctx, intervals,postObj);	  //记录响应日志
          console.log(postObj)
     
     
    }).catch((err) => {
      intervals = new Date() - start;
     logsUtil.logError(ctx, error, intervals);//记录异常日志
      ctx.body = {
        code: 500,
        msg: err
      }
    })
}

module.exports = options