const sql=require('../sql/users')
const logsUtil=require('../config/logs')

const options = async (ctx,next)=>{
  // console.log(ctx.query);
  let postObj = ctx.request.body
  // console.log(postObj)

  // console.log(ctx.request.body)
  
     await sql()
     .then((result) => {
  				          console.log(result)
          //  next();
        
          ctx.body = {
            status: 200,
            msg: result
          }
          // logsUtil.logResponse(ctx,postObj);	  //记录响应日志
          // console.log(postObj)
     
     
    }).catch((err) => {
     
     logsUtil.logError(ctx, error);//记录异常日志
      ctx.body = {
        code: 500,
        msg: err
      }
    })
}

module.exports = options