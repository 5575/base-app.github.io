var AdminUser = require('../../models/AdminUser')
var express = require('express');
var router = express.Router();

////引入crypto模块
const crypto = require('crypto')


//////列表页
router.get('/:page?', function (req, res, next) {
    //res.send('respond with a resource');
    //
    var filter = {}

    var user_name = req.query.user_name
    var mobile = req.query.mobile

    if (!!user_name) {
        filter.user_name = {
            '$regex': `.*?${user_name}.*?`
        }
    }

    if (!!mobile) {
        filter.mobile = {
            '$regex': `.*?${mobile}.*?`
        };
    }
    var page = Number(req.params.page) || 1;
    AdminUser.dal.getListByPage(filter, page, 10, function (data) {
        data.title = "管理员信息管理"
        data.query = req.query
        res.render('admin/admin_user/index', data)
    })
});

/////编辑页面 添加和修改在一起
router.get('/editor/:id', function (req, res, next) {
    AdminUser.dal.getModelById(req.params.id, (data) => {
        if (data.id) {
            data.title = '信息编辑'
            res.render('admin/admin_user/editor', {
                data: data
            })
        } else {
            // res.send('err')
            data = new AdminUser.db.AdminUser()
            // data = data.toObject()
            // data.id = data._id
            // delete data._id
            data.isAdd = true /////是否为新增,如果是新增 为密码添加验证规则
            data.title = '信息编辑'
            res.render('admin/admin_user/editor', {
                data: data
            })
        }
    })
});
//////编辑表单提交
router.post('/editor/:id', function (req, res, next) {
    var model = req.body;

    ////测试MD5加密功能
    const md5 = crypto.createHash('md5')

    //////判断用户密码是否有输入 如果有就修改密码 没有就不对密码项做操作
    if (!!req.body.pwd.trim()) {
        model.pwd = md5.update(req.body.pwd).digest('hex').toString()
        model.is_encrypt = 1
    } else {
        delete model.pwd
    }

    AdminUser.dal.update(req.params.id, model, true, (data) => {
        if (data) {
            //res.json(data)
            res.redirect('/admin/adminUser/1');
        } else {
            res.send('err')
        }
    })
});

///////删除操作
router.post('/delete', function (req, res, next) {
    if (req.body.id) {
        AdminUser.dal.remove(req.body.id, (data) => {
            if (data) {
                console.log('删除成功');
            } else {
                console.log('删除失败')
            }
            res.redirect('/admin/adminUser/1');
        })
    } else {
        res.redirect('/admin/adminUser/1');
    }
})

module.exports = router;
