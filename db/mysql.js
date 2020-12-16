//mysqlConfig.js
const mysql = require('mysql');
const dbConfig = require('./db');//数据库配置和服务端口
const logsUtil = require('../config/logs');
// 创建数据池
const pool = mysql.createPool({
    host: dbConfig.databases.host,
    user: dbConfig.databases.user,
    password: dbConfig.databases.password,
    database: dbConfig.databases.database,
    connecTimeout: dbConfig.databases.connecTimeout,
  	multipleStatements: dbConfig.databases.multipleStatements,
  	connectionLimit: dbConfig.databases.connectionLimit,
  	queueLimit: dbConfig.databases.queueLimit,
});

let query = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
      // 在数据池中进行会话操作
      pool.getConnection((err, connection)=> {
        // 如果有错误就抛出
        if (err) {
            console.error("数据库连接失败")
          reject( err )
        } else {
          console.info("数据库连接成功")
          connection.query(sql, values, ( err, rows) => {
            logsUtil.logHandle(sql,values) //保存所有操作的sql
            if ( err ) {
              console.log('查询数据失败');  
              reject( err )
            } else {
              // console.log(rows);
              resolve( rows )
            }
            // 结束会话
            connection.release();
            
          })
        }
        console.log(pool._freeConnections.indexOf(connection))  //查看数据库资源
      })
    })
  }


module.exports = query;

