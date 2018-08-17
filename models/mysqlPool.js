var mysql = require('mysql'); // 引用mysql模块。注意要先安装mysql： npm install mysql
// var config = require('./db');

var onelib = {
    connectionLimit: 10, //连接池可创建的最大连接数
    max_connections: 20, // mysql 能同时提供有效服务的最大连接数 
    max_used_connections: 20, // mysql 的峰值连接数
    host: '103.10.0.117',
    user: 'dba_admin',
    password: 'Aq1sw2de3',
    database: 'xkmagiccrawler',
    port: '3306',
    dateStrings: true, // 时间以字符串形式显示，否则会有类似这样的显示：Thu Apr 14 2016 00:00:00 GMT+0800 (中国标准时间) 17:20:12
}
console.log('===========start mysql service=========')
var onelib_pool = mysql.createPool(onelib);
// exports.onelib_pool = onelib_pool;


var Task = function () {}; // 预定义一个空的类，接下来只需要往里增加方法即可

Task.prototype.find = function (sql, id, callback) { // 增加一个方法，名为find，传入参数为id和回调函数callback

    // sql查询语句，注意这里的“?”号，它会在query的时候被处理
    // var sql = "SELECT * FROM tasks WHERE id =?";

    // 获取mysql的onelib_pool连接池，以回调的方式处理（即获取成功后，执行下一步）
    onelib_pool.getConnection(function (err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // 获取成功后，执行query
        // 注意到这里有三个参数，第一个是sql语句，第二个是一个数组，第三个是回调函数
        // 需要着重说明的是第二个参数，它将依次替换sql里的“?”号
        // sql语句被替换后，会是这样的："SELECT * FROM tasks WHERE id = " + id
        connection.query(sql, [id], function (err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
    });
};

module.exports = Task.prototype.find;