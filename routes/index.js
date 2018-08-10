var express = require('express');
var router = express.Router();

// var bodyParser = require('body-parser');
// // 创建 application/x-www-form-urlencoded 编码解析
// var urlencodedParser = bodyParser.urlencoded({
//     extended: false
// })

var mysql = require('../models/mysql');

/* GET home page. */
router.get('/', function (req, res, next) {
    var result = mysql.query('SELECT app_id from adapter_appinfo ', function (val) {
        val = JSON.stringify(val);
        console.log('result', val)

        res.render('index', {
            title: val
        });
    })
    result;
});

router.post('/getTemplateList', function (req, res, next) {

    // 获取参数
    var query = req.body;
    console.log("post请求：参数", query);

    // var sql = 'SELECT * from adapter_template';
    var sql = 'select t.taskno,t.task_name,t.task_type,t.enabled,t.startime,t.endtime from crawl_task t';
    var result = mysql.query(sql, function (val) {


        var data = {
            data: val,
            status: {
                code: 0,
                message: 'success'
            }
        }
        // data = JSON.stringify(data);
        console.log(data)

        // render方法  ：渲染 html 视图，所以返回的是html模板
        // res.render('index', {
        //     title: data
        // });
        // return data;
        res.json(data)
    })
    result;
    // res.json(result)
});

module.exports = router;