/**
 * Created by yuluo on 16/07/23.
 */
////引入mongoose模块
var db = require('mongoose');

//// 链接数据库 mongodb 协议, localhost 主机ip, student_db 数据库名称
db.connect('mongodb://localhost/base_db');


////管理员信息
var AdminUser = db.model('admin_user',{
    name:{type:String,default:""},
    user_name:{type:String,required:true},
    pwd:{type:String,default:""},
    is_encrypt:{type:Number,default:1}, /////定义用户密码是否加密,默认是加密的
    mobile:{type:String,default:""},
    remarks:{type:String,default:""},
    avatar:{type:String,default:""},
    create_time:{type:Date,default:Date.now},
    update_time:{type:Date,default:Date.now}
})

var BlogType = db.model('blog_type',{
  name:{type:String,required:true},
  order_num:{type:Number,default:0},
  img:{type:String,default:""},
  remarks:{type:String,default:""},
  create_time:{type:Date,default:Date.now},
  update_time:{type:Date,default:Date.now}
})

var Blog = db.model('blog',{
  title:{type:String,default:""},
  type:{type:String,default:""},
  description:{type:String,default:""},
  tags:{type:String,default:""},
  img:{type:String,default:""},
  view_times:{type:Number,default:0},
  content:{type:String,default:""},
  create_time:{type:Date,default:Date.now},
  update_time:{type:Date,default:Date.now}
})

/////模块导出
module.exports = {
    AdminUser:AdminUser,
    BlogType:BlogType,
    Blog:Blog
}
