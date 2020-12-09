const Koa = require('koa');
const cors = require('koa2-cors');
const cluster = require('cluster');  //多线程
const app = new Koa();
const dbConfig = require('./db/db');  //数据库配置和服务端口
require('console-color-mr');  //颜色模块
const koaBody = require('koa-body');  //处理post请求参数
app.use(koaBody({
  multipart:true, // 支持文件上传
}));
app.use(
  cors({
      origin: function(ctx) { //设置允许来自指定域名请求
        // console.log(ctx)
          if (ctx.url === '/test') {
              return '*'; // 允许来自所有域名请求
          }
          return 'http://10.168.31.11:8888'; //只允许http://localhost:8080这个域名的请求
      },
      maxAge: 5, //指定本次预检请求的有效期，单位为秒。
      credentials: true, //是否允许发送Cookie
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法'
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
);

const helmet = require("koa-helmet");  //提高网站安全性
app.use(helmet());

// 配置解析请求中间件
const router = require('./routers/router')  //路由模块
app.use(router.routes())  /*启动路由*/
.use(router.allowedMethods())

// 字符串转换
const json = require('koa-json');
app.use(json());


// 捕获错误logger 记录
const logsUtil = require('./config/logs');
app.on('error', (err, ctx) => {
  const start = new Date();					          // 响应开始时间
  let intervals;
  intervals = new Date() - start;								              // 响应间隔时间
  logsUtil.logError(ctx, err,intervals)
  console.error('服务器报错，请查看日志错误信息', err, ctx,intervals)
});





/**
 * 多线程
 * cluster 用于监听 process(child) 子进程触发的各种事件
 * worker 在主进程中获取，用于和自身通信。当子进程触发事件时，会返回当前的 worker 以及相关的信息到主进程相应的事件中
 * process(parent) 主进程本身的进程实例，在通信过程中基本没有用到
 * process(child) 子进程本身的实例，只能在子进程获取用于监听自身的事件
 */

//启用轮叫调度，实现负载均衡
cluster.schedulingPolicy = cluster.SCHED_RR  ;
if (cluster.isMaster) {//主进程
  const numCPUs = require('os').cpus().length;
  // 循环 fork 任务 CPU i5-7400 四核四进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`主进程运行在 ${worker.process.pid} `.red);
 // 主进程退出，子进程全部退出
    for(let x in worker ){
      worker[x].kill();
    }
  });
} else {
 //监听端口
app.listen(`${dbConfig.host}`,()=>{
  console.info(`子进程运行在${process.pid}`)
});
}
