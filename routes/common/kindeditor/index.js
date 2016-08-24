/**
 * Created by yuluo on 16/7/2.
 *
 * kindeditor文件上传控制器
 */
var express = require('express');
var router = express.Router();
////接收form表单数据的中间件
var formidable = require('formidable');



router.post('/uploadImg', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    //注意此处上传目录的路径
    form.uploadDir = __dirname+'/../../../public/uploads';

    form.parse(req, function (err, fields, files) {
        if (err) {
            throw err;
        }

        var image = files.imgFile;
        var path = image.path; ////路径 包含文件名
        //console.log("替换之前的path:"+path);
        path = path.replace(/\\/g, '/');
        //console.log(path);
        var url = '/uploads' + path.substr(path.lastIndexOf('/'), path.length);

        //url = url.replace('\\', '/');
        //console.log(url);
        var info = {
            "error": 0,
            "url": url
        };
        res.send(info);
    });
});

module.exports = router;
