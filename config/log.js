let path = require('path');

//日志输出目录
let  baselogPath = path.resolve(__dirname,'../logs');
/**
 * 报错输出日志
 *错误日志目录，文件名，输出完整路径
 */
let  errorPath = '/error' ;
let  errorFileName = 'error';
let errorLogPath = baselogPath + errorPath + '/' + errorFileName;

/**
 * 请求数据响应时输出响应日志
 * 响应日志目录，文件名，输出完整路径
 */
 let responsePath = '/respone';
 let responseFlieName = 'response' ; 
 let responseLogPath = baselogPath + responsePath + '/' +responseFlieName ;

 /**
  * 操作数据进行增删改等敏感操作记录
  * 操作日志目录，文件名，输出完整路径
  */
 let handlePath = '/handle';
 let handleFlieName = 'handle';
 let handleLogPath = baselogPath + handlePath + '/' +handleFlieName ;

 /**
  * 日志格式等设置
  */
 module.exports = {
    //日志格式等设置
    appenders:
        {
            "rule-console": {"type": "console"},   // 会打印到控制台
            "errorLogger": {
                "type": "dateFile",
                "filename": errorLogPath,   //日志保存文件的路径及文件名，./为项目根目录
                "pattern": "-yyyy年-MM月-dd日-hh时.log",   //滚动日志的时间类型，默认为 .yyyy-MM-dd
                "alwaysIncludePattern": true,   //在当前日志文件名中和滚动日志一样包括pattern
                "encoding": "utf-8",
                "maxLogSize": 52428800,   //日志文件的最大大小(以字节为单位),如果未指定，则不会发生日志滚动
                "numBackups": 3,      
                "path": errorPath,
                compress:true
            },
            "resLogger": {
                "type": "dateFile",
                "filename": responseLogPath,
                "pattern": "-yyyy年-MM月-dd日-hh时.log",
                "alwaysIncludePattern": true,
                "encoding": "utf-8",
                "maxLogSize": 52428800,
                "numBackups": 3,
                "path": responsePath,
                compress:true
            },
            "handleLogger": {
                "type": "dateFile",
                "filename": handleLogPath,
                "pattern": "-yyyy年-MM月-dd日-hh时.log",
                "alwaysIncludePattern": true,
                "encoding": "utf-8",
                "maxLogSize": 52428800,
                "numBackups": 3,
                "path": responsePath,
                compress:true    
            },
        },
    //供外部调用的名称和对应设置定义
    categories: {
        "default": {"appenders": ["rule-console"], "level": "all"},
        "resLogger": {"appenders": ["resLogger"], "level": "info"},
        "errorLogger": {"appenders": ["errorLogger"], "level": "error"},
        "handleLogger": {"appenders": ["handleLogger"], "level": "all"},
        "http": {"appenders": ["resLogger"], "level": "info"}
    },
    "baseLogPath": baselogPath
}