const  dbConfig = {
    host:7777,
    // 数据库配置
    databases: {
        database: 'bk',//数据库名称
        user: 'root',//mysql用户名
        password: 'root',//mysql密码
        port: '3306',//mysql端口号
        host: "127.0.0.1",//服务器i
        connecTimeout: 500,//连接超时,
        multipleStatements: false,//是否允许一个query中包含多条sql语句
        waitForConnection: true,//当无连接池可用时，等待(true) 还是抛错(false)
		connectionLimit: 100,//连接限制
		queueLimit: 0//最大连接等待数(0为不限制)
    }
}

module.exports = dbConfig;