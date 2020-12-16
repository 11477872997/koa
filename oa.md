## 项目结构
└── koa
    ├──app.js node.js入口文件。 可以通过node app.js来开启服务。多线程启动
├──logs 文件夹 记录日志操作
    ├──  access 请求日志
    ├──application  系统报错日志
├──server 文件夹 对应每个http请求的接口
    ├──user.js 用户接口
├── db文件夹 连接数据库
   ├── db.js 数据库配置和服务器端口
   ├── mysql.js 数据库连接配置
   ├── ljdb     文件夹数据库查询语句逻辑
├── routers 处理路由
    ├── routers.js 路由配置
├── config.js 全文配置
    ├── log.js 配置文件方法
    ├── logs.js  放置输出日志的工具方法
    ├── md5.js  放置加密
├── nodemon.josn --nodemon 服务器启动配置



## 项目启动
// 安装依赖包 
npm i
// 运行项目
方法一：启动多进程
node app
npm run dev   //自动启动服务器



 ## md 解释json 文件
├──nodemon.md 文件插件注释解释
├──oa.md      项目解释
├──package.md 环境注释解释
├──cluster.md 线程注释解释



## 项目插件
├── npm init -y    初始化项目
├── npm i koa    安装koa框架
├── npm install log4js  安装日志  
├── npm install mysql --save 安装连接数据库
    ├──注意：如果无法连接本地mysql 在数据库输入下面的命令 数据库版本8.0就会出现；连接失败
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'yourpassword';
├──  npm i koa-router --save 安装路由
├── npm install koa-bodyparser --save 安装 获取post请求过
来的值
  ├──注意：引入必须在路由或koa-body前不然拿不到值
├── npm i koa-body -S 安装 获取post请求过来的值 支持文件上传
├── npm install koa-json 字符串转换
├── npm install moment --save 时间插件  http://momentjs.cn/
 ├── console.log(Moment().format('YYYY-MM-DD HH:mm:ss'));
├── npm install koa-helmet --save 提高网站安全  https://blog.csdn.net/weixin_34367257/article/details/88029619
    ├──app.use(helmet.contentSecurityPolicy());  //单独来设置 Http 头
    ├──app.use(helmet.dnsPrefetchControl());  //dnsPrefetchControl通过将X-DNS-Prefetch-Control设置为off禁止浏览器进行DNS预解析。
    ├──app.use(helmet.expectCt());
    ├──app.use(helmet.frameguard()); // frameguard通过设置x-frame-options来允许iframe的域。
    ├──app.use(helmet.hidePoweredBy()); //可以隐藏或混淆响应头中的X-Powered-By字段以迷惑攻击者
    ├──app.use(helmet.hsts()); 设置Strict-Transport-Security告知用户在一定的时间段使用https访问。防止降级攻击和cookie劫持。
如下设置未来的90天内只使用https访问。
    ├──app.use(helmet.ieNoOpen());  //设置X-Download-Options为noopen不允许在在站点的上下文打开下载的HTML文件。
    ├──app.use(helmet.noSniff());  //设置 X-Content-Type-Options为nosniff后，浏览器不再进行自动识别。这意味着响应的文件类型如果与Content-Type中声明的不一致，将会被浏览器屏蔽掉。
    ├──app.use(helmet.permittedCrossDomainPolicies());
    ├──app.use(helmet.referrerPolicy());
    ├──app.use(helmet.xssFilter()); //设置X-XSS-Protection提供基本的XSS防护，避免基本的反射性XSS攻击。
├── npm i koa2-cors --save 跨域
   
├── npm i nodemon -g  nodejs开发辅助工具\color{red}{nodemon}  服务器自动重新部署
   ├── nodemon app 命令代替 node app
 




