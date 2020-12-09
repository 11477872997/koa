{
  "restartable": "rs",   //设置重启模式
  "ignore": [    //设置忽略的文件
    ".git",
    "node_modules/**/node_modules"
  ],
  "verbose": true,  //设置日志输出模式的，true详细模式
  "execMap": {     //设置运行服务器的后缀语对应的命令 表示使用nodemon 代替 node
    "js": "node --harmony"
  },
  "events": {
    "restart": "osascript -e 'display notification \"App restarted due to:\n'$FILENAME'\" with title \"nodemon\"'"
  },
  "watch": [   //监听哪些文件的变当变化的时候就自动重启
    "test/fixtures/",
    "test/samples/"
  ],
  "env": {  
    "NODE_ENV": "development"
  },
  "ext": "js,json"    //监控指定的后缀文件名
}