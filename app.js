/**
 * Created by yuluo on 16/07/23.
 */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

////引入arttemplate模板
var template = require('art-template');
template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//////kindeditor测试部分内容
app.use('/', require('./routes/common/kindeditor/demo'));
/////kindeditor文件上传部分代码
app.use('/common/kindeditor', require('./routes/common/kindeditor/index'));

/**
 * 初始化项目的一些基础目录结构
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function initApp(req, res, next) {
    /////判断目录是否存在
    fs.exists('./public/uploads', function (d) {
        if (d) {
            console.log('上传目录已存在');
            next();
        }
        else {
            /////创建一个在项目根目录中创建一个notes目录
            fs.mkdirSync('./public/uploads');
            console.log('初始化上传目录完成');
            next();
        }
    })
}

var AdminUser = require('./models/AdminUser')
////引入crypto模块
const crypto = require('crypto')
app.get('/admin/login', (req, res) => {
    res.render('admin/login')
})
app.post('/admin/user/login', (req, res) => {
    AdminUser.dal.findOneByFilter({ user_name: req.body.userName }, function (data) {
        console.log(data)
        if (data) {
            const md5 = crypto.createHash('md5')
            var pwd = req.body.pwd
            /////对密码进行处理 是否加密做操作
            if (data.is_encrypt == 1) {
                pwd = md5.update(pwd).digest('hex').toString()
            }
            if (pwd == data.pwd) {
                /////登陆成功后把id写入cookie
                ////此处注意写cookie的path参数
                res.cookie('user', data.id, { path: '/' })
                res.json({ status: 'y', msg: '登陆成功' })
            }
            else {
                res.json({ status: 'n', msg: '密码错误' })
            }
        }
        else {
            res.json({ status: 'n', msg: '用户信息不存在' })
        }
    })
})
app.get('/admin/validateUser', (req, res) => {
    AdminUser.dal.findOneByFilter({ user_name: req.query.user_name }, function (data) {
        console.log(data)
        if (data) {
            res.send('false')
        }
        else {
            res.send('true')
        }
    });
})
app.get('/admin/getLoginedUser', (req, res) => {
    AdminUser.dal.getModelById(req.cookies.user, function (data) {
        if (data) {
            res.json({status:'y',msg:'获取数据成功',data:{user_name:data.user_name,avatar:data.avatar}})
        }
        else {
            res.json({status:'n',msg:'获取数据失败'})
        }
    })
})

/**
 * 通过此方法判断是访问的管理后台目录,在此处做用户是否登录的权限判断
 * [all description]
 * @param  {[type]} '/admin/*'    [description]
 * @param  {[type]} (req,res,next [description]
 * @return {[type]}               [description]
 */
app.all('/admin/*', (req, res, next) => {
    console.log('这里访问的是管理后台...')
    if (req.cookies.user) {
        ////判断cookie是否存在 根据cookie取数据
        AdminUser.dal.getModelById(req.cookies.user, function (data) {
            if (data) {
                next()
            }
            else {
                res.redirect('/admin/login')
            }
        })
    }
    else {
        res.redirect('/admin/login')
    }
})

///如果静态目录中没有index.html会走此处,前提是静态目录配置放在此处代码前面
app.get('/', initApp, (req, res) => {
    res.send('app启动');
    //res.redirect('/student/list/1');
})
app.use('/common', require('./routes/common/common'))

app.use('/admin/adminUser/', require('./routes/admin/admin_user'))
app.use('/admin/blogType/',require('./routes/admin/blog_type'))
app.use('/admin/blog/',require('./routes/admin/blog'))


 //设置跨域访问 
app.all('/api/*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
});
app.use('/api',require('./routes/api/index'))

 var AdminUser = require('./models/AdminUser')
// AdminUser.dal.findByFilter({},(data)=>{

//     data = data.map(function(item){
//         item = item.toObject()
//         item.kk = 123
//         return item
//     })
//     // console.log(data)
//     /////对查询结果进行过滤 使用filter的回调函数
//     console.log(data.filter(function(k){return k.user_name == 'admin'})[0])
// })

// AdminUser.dal.getListByPage({},1,10,function(data){
//   console.log(data)
// })
// AdminUser.dal.findOneByFilter({user_name:"admin"},function(data){
//   console.log(data)
// })
// AdminUser.dal.getModel('123')
// AdminUser.dal.findByID();
// console.dir(AdminUser)

// var NoteFolder = require('./models/NoteFolder')
// console.dir(NoteFolder)
// NoteFolder.dal.getModel('123')


app.listen(3000, (req, res) => {
    console.log('服务器运行中...');
})
