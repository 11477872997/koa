const query =require('../../db/mysql');
let loginUser = function (name,password){
    let _sql = `select name,password from users where name='${name}' or password='${password}' `
    return query( _sql,__filename)
}

module.exports = {loginUser}