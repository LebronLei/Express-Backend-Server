var mysql = require('mysql');
var db = {};
db.query = function sqlback(sqllan, fn) {
    var connection = mysql.createConnection({
        host: '103.10.0.117',
        user: 'dba_admin',
        password: 'Aq1sw2de3',
        database: 'xkmagiccrawler',
        port: '3306',
    });
    connection.connect(function (err) {
        console.log('connection', err)
        if (err) {
            console.log(err);
            return;
        }
    });
    var sql = sqllan;
    if (!sql) return;
    console.log('mysql connect success')
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            return;
        };
        fn(rows);

    });

    connection.end(function (err) {
        if (err) {
            return;
        } else {
            console.log('connection close')
        }
    });
}
module.exports = db;