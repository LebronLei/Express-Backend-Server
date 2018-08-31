var express = require('express');
var router = express.Router();

// var bodyParser = require('body-parser');
// // 创建 application/x-www-form-urlencoded 编码解析
// var urlencodedParser = bodyParser.urlencoded({
//     extended: false
// })

//普通连接 
var mysql = require('../models/mysql');

// 连接池
var mysqlPool = require('../models/mysqlPool');

var myUnits = require('../models/units');
// 
console.log('mysql--------------')

/* GET home page. */
router.get('/', function (req, res, next) {
    // SELECT app_id from adapter_appinfo
    var result = mysql.query('SELECT app_id from adapter_appinfo ', function (val) {
        val = JSON.stringify(val);
        console.log('result', val)

        res.render('index', {
            title: val
        });
    })
    result;
});


// 任务列表
router.post('/get_task_list', function (req, res, next) {
    // console.log(myUnits.formatDate(new Date()))

    // 获取参数
    var query = req.body;
    console.log("post请求：参数", query, query.taskName);


    // 分页
    myUnits.pagination('crawl_task', query.page_num, query.page_size, " WHERE task_name LIKE '%" + query.taskName + "%'", function (pagination) {
        get_list(pagination);
    })



    function get_list(pagination) {
        // 列表查询
        var sql = "SELECT t.taskno,t.task_name,t.task_type,t.enabled,t.startime,t.endtime FROM crawl_task t limit " + (query.page_num - 1) * query.page_size + "," + query.page_size + " ";
        var selectTaskName = " WHERE task_name LIKE '%" + query.taskName + "%'";
        // console.log(2222, query.taskName)

        if (query.taskName) {
            sql = "SELECT t.taskno,t.task_name,t.task_type,t.enabled,t.startime,t.endtime FROM crawl_task t " + selectTaskName + " limit " + (query.page_num - 1) * query.page_size + "," + query.page_size + " ";
            console.log('sql', sql)
        }
        mysql.query(sql, function (err, val, fields) {
            // console.log('fields', fields)
            var resData;
            if (err) {

                resData = {
                    data: err,
                    // status: {
                    code: 10,
                    message: 'fail'
                    // }
                }
            } else {
                resData = {
                    pagination: pagination,
                    data: val,
                    // status: {
                    code: 0,
                    message: 'success'
                    // }
                }
            }
            res.json(resData)
        })

    }
});





// 新增任务列表
router.post('/add_task_list', function (req, res, next) {

    // 获取参数
    var query = req.body;
    console.log("post请求：参数", JSON.parse(query.templateList));
    // var array1 = [1, 2, 3];
    // array1.forEach(function (item, index) {
    //     console.log(item + '---' + index);
    // });

    JSON.parse(query.templateList).forEach(function (err, val, key) {
        console.log(val, key)

    });
    // return;

    // var sql = "SELECT t.taskno,t.task_name,t.task_type,t.enabled,t.startime,t.endtime FROM crawl_task t";
    // var selectTaskName = " WHERE task_name LIKE '%" + query.taskName + "%'";

    var sql = "INSERT INTO crawl_task(task_name,task_type,need_authentication,authentic_validtime,frequency,seed,startime,endtime,updatetime,note,enabled,crawl_type) VALUES('" + query.name + "','" + query.type + "','" + query.isAuth + "','" + query.validity + "','" + query.frequency + "','xxx','" + query.startDate + "','" + query.endDate + "','" + myUnits.formatDate(new Date()) + "','" + query.remark + "','1','0')"
    // var sql = "INSERT INTO crawl_task(task_name,task_type,need_authentication,authentic_validtime,frequency,seed,startime,endtime,note,enabled) VALUES(0,?,?,?,?,?,?,?,?,?,?)";
    // var params = [query.name, query.type, query.isAuth, query.validity, query.frequency, 'xxx', query.startDate, query.endDate, query.remark, '1'];
    // console.log(2222, query.taskName)

    mysql.query(sql, function (val) {
        var resData;

        // if (err) {
        //     console.log('error', err, val);
        //     resData = {
        //         status: {
        //             code: 10,
        //             message: 'fail'
        //         }
        //     }
        // } else {
        console.log('-----------------新增成功----------------');
        var resData;
        if (err) {
            resData = {
                data: val,
                // status: {
                code: 10,
                message: 'fail'
                // }
            }
        } else {
            resData = {
                data: val,
                // status: {
                code: 0,
                message: 'success'
                // }
            }
        }
        res.json(resData)
    })
});


// 任务列表的 停止或启用
router.post('/task_stop_or_start', function (req, res, next) {
    // 获取参数
    var query = req.body;
    console.log("post请求：参数", query);
    var sql = "UPDATE crawl_task SET enabled=" + query.enabled + " WHERE taskno= " + query.taskno + "";
    mysql.query(sql, function (err, val, fields) {
        var resData;
        if (err) {
            resData = {
                data: err,
                // status: {
                code: 10,
                message: 'fail'
                // }
            }
        } else {
            resData = {
                // status: {
                code: 0,
                message: 'success'
                // }
            }
        }
        res.json(resData)
    })
});



// 任务列表的 删除

// router.post('/task_list_delete', function (req, res, next) {
//     // 获取参数
//     var query = req.body;
//     console.log("post请求：参数", query);
//     // var sql = "start transaction";

//     var resData;


//     mysql.query('START TRANSACTION', function (err, val, fields) {
//         console.log(111, err)
//         mysql.query("UPDATE crawl_task SET note='Affddbb' WHERE taskno= " + query.taskno + "", function (err, val) {

//             console.log(222, err)
//             mysql.query('ROLLBACK ', function (err, val, fields) {
//                 console.log(333, err)
//             })


//         })

//     })
//     // try {
//     //     // one;
//     // } catch (err) {
//     //     console.log('fail')
//     //     // rollback
//     // } finally {
//     //     console.log('success-----------------')
//     //     // three
//     //     resData = {
//     //         status: {
//     //             code: 0,
//     //             message: 'success'
//     //         }
//     //     }
//     //     res.json(resData)


//     // }
// });






router.post('/task_list_delete', function (req, res, next) {
    // 获取参数
    var query = req.body;
    console.log("post请求：参数", query);
    var sql = "DELETE FROM crawl_task  WHERE taskno= " + query.taskno + "";
    mysql.query(sql, function (err, val, fields) {
        var resData;
        if (err) {
            resData = {
                data: err,
                // status: {
                code: 10,
                message: 'fail'
                // }
            }
        } else {
            resData = {
                // status: {
                code: 0,
                message: 'success'
                // }
            }
        }
        res.json(resData)
    })
});



module.exports = router;