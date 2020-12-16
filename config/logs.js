let log4js = require('log4js');
let logConfig = require('./log');

 // 加载配置文件
 log4js.configure(logConfig);

//  调用预先预定的日志名称
let resLogger = log4js.getLogger("resLogger");//请求数据响应
let errorLogger = log4js.getLogger("errorLogger"); //错误日志
let handleLogger = log4js.getLogger("handleLogger"); //操作数据
let consoleLogger = log4js.getLogger();
// 格式化日志文本 加上日志头尾和换行方便查看 ==>  普通日志、请求日志、响应日志、操作日志、错误日志
let formatText = {
    info: function(info) {
        let logText = new String();
        //响应日志头信息
        logText += "\n" + "***************info log start ***************" + "\n";
        //响应内容
        logText += "info detail: " + "\n" + JSON.stringify(info) + "\n";
        //响应日志结束信息
        logText += "*************** info log end ***************" + "\n";
        return logText;
    },
    request: function(req,postObj) {
        let logText = new String();
        let method = req.method;
        //访问方法
        logText += "请求方式: " + method + "\n";
        //请求原始地址
        logText += "请求接口路径:  " + req.originalUrl + "\n";
        //客户端ip
        logText += "访问的ip  " + req.ip + "\n";
        //请求的设备
        logText += "访问的设备:  " + req.headers['user-agent'] + "\n";
        //请求参数
        if (method === 'GET') {
            logText += "地址栏传的值:  " + JSON.stringify(req.query) + "\n";
     
        }else if(method === 'POST') {
            logText += "POST页面传的值: " + "\n" + JSON.stringify(postObj) + "\n";
           
        }else{
            logText += "页面传的值: " + "\n" + JSON.stringify(req.body) + "\n";
        }
        return logText;
    },
    response: function(ctx,postObj) {
        let logText = new String();
        //响应日志开始
        logText += "\n" + "*************** response log start ***************" + "\n";
        //添加请求日志
        logText += formatText.request(ctx.request,postObj);
        //响应状态码
        logText += "响应状态码: " + ctx.status + "\n";
        //响应内容
        logText += "响应内容: " + "\n" + JSON.stringify(ctx.body) + "\n";
        //响应日志结束
        logText += "*************** response log end ***************" + "\n";
        return logText;
    },
    handle: function(info,name) {
        let logText = new String();
        //响应日志开始
        logText += "\n" + "***************info log start ***************" + "\n";
        //响应内容
        logText += "数据库语句: " + "\n" + JSON.stringify(info).replace(/\\n/g, "\n") + "\n"; 
        //当前目录
        logText += "当前目录: " + "\n" + JSON.stringify(name).replace(/\\n/g, "\n") + "\n";
        //响应日志结束
        logText += "*************** info log end ***************" + "\n";
        return logText;
    },
    error: function(ctx, err) {
        let logText = new String();
        //错误信息开始
        logText += "\n" + "*************** error log start ***************" + "\n";
        //添加请求日志
        logText += formatText.request(ctx.request);
        //错误名称
        logText += "err name: " + err.name + "\n";
        //错误信息
        logText += "err message: " + err.message + "\n";
        //错误详情
        logText += "err stack: " + err.stack + "\n";
        //错误信息结束
        logText += "*************** error log end ***************" + "\n";
        return logText;
    }
}

module.exports = {
    //封装普通日志
    logInfo: function(info) {
        if (info) {
            consoleLogger.info(formatText.info(info));
        }
    },
    //封装响应日志
    logResponse: function(ctx,postObj) {
        if (ctx) {
            resLogger.info(formatText.response(ctx,postObj));
        }
    },
    //封装操作日志
    logHandle: function(res,name) {
        if (res) {
            handleLogger.info(formatText.handle(res,name));
        }
    },
    //封装错误日志
    logError: function(ctx, error) {
        if (ctx && error) {
            errorLogger.error(formatText.error(ctx, error));
        }
    }
};