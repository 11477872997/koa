let md5 = require('md5');
exports.MD5 = function(val){
  let passSolt = md5(md5(val));
  return  passSolt;

}