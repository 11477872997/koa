const query =require('../../db/mysql');

// 查询用户
let registerUser = function (choose,name,password){
    if(choose == 0){
        let _sql = `select name from users where name='${name}'`
        return query( _sql,__filename)
    }else if(choose == 1){
        let _sql = `select * from users where name='${name}' and password = '${password}'`
        return query( _sql,__filename)
    }
     
}
// 注册用户
let insertUser = function(name,password){
    let _sql = `INSERT INTO users(id,name,password) VALUES(REPLACE(UUID(), '-', ''),'${name}','${password}')`
    return query( _sql,__filename)
} 

module.exports = {registerUser,insertUser} 