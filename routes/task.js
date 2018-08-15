var express = require('express');
var router = express.Router();

// var bodyParser = require('body-parser');
// // 创建 application/x-www-form-urlencoded 编码解析
// var urlencodedParser = bodyParser.urlencoded({
//     extended: false
// })

var mysql = require('../models/mysql');
var myUnits = require('../models/units');
// console.log('mysql---', mysql.query)


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
    console.log("post请求：参数", query);

    var sql = "SELECT t.taskno,t.task_name,t.task_type,t.enabled,t.startime,t.endtime FROM crawl_task t";
    var selectTaskName = " WHERE task_name LIKE '%" + query.taskName + "%'";
    console.log(2222, query.taskName)


    // 列表查询
    if (query.taskName) {
        // sql += String(selectTaskName);
        sql = "SELECT t.taskno,t.task_name,t.task_type,t.enabled,t.startime,t.endtime FROM crawl_task t " + selectTaskName;
        console.log('sql', sql)
    }
    mysql.query(sql, function (err, val) {
        var resData;
        // if (err) {
        //     resData = {
        //         data: val,
        //         status: {
        //             code: 10,
        //             message: 'fail'
        //         }
        //     }
        // } else {
        resData = {
            data: val,
            status: {
                code: 0,
                message: 'success'
            }
        }
        // }
        res.json(resData)
    })
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

    JSON.parse(query.templateList).forEach(function (val, key) {
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
                status: {
                    code: 10,
                    message: 'fail'
                }
            }
        } else {
            resData = {
                data: val,
                status: {
                    code: 0,
                    message: 'success'
                }
            }
        }
        res.json(resData)
    })
});
module.exports = router;