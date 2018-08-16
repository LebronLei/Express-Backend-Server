// export default {
// var myUnits;

var mysql = require('./mysql');
var myUnits = {
    // 格式化时间 yyyy-MM-dd HH:mm:ss
    formatDate: function (val) {
        var dates = new Date(val)
        var newDate = dates.getFullYear() + '-' + ((dates.getMonth() + 1) >= 10 ? (dates.getMonth() + 1) : '0' + (dates.getMonth() + 1)) + '-' + (dates.getDate() >= 10 ? dates.getDate() : '0' + dates.getDate()) + ' ' + (dates.getHours() >= 10 ? dates.getHours() : '0' + dates.getHours()) + ':' + (dates.getMinutes() >= 10 ? dates.getMinutes() : '0' + dates.getMinutes()) + ':' + (dates.getSeconds() >= 10 ? dates.getSeconds() : '0' + dates.getSeconds());
        return newDate;
    },

    // 封装的分页方法
    pagination: function (tableName, pageNum, pageSize, callback) {
        var pagaSql = "select count(*) as count from " + tableName;
        var pagination = {
            all_count: '',
            page_num: Number(pageNum),
            total_page: '',
            page_size: Number(pageSize),
        }

        mysql.query(pagaSql, function (err, val, fields) {

            if (err) {
                resData = {
                    data: err,
                    status: {
                        code: 10,
                        message: 'fail'
                    }
                }
            } else {
                // console.log(9999999, val, val[0].count, JSON.parse(JSON.stringify(val)))
                pagination.all_count = val[0].count;
                pagination.total_page = Math.ceil(val[0].count / pageSize);
                callback(pagination);
            }
        })
    }
}

module.exports = myUnits;