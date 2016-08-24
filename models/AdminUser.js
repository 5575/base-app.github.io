/**
 * Created by yuluo on 16/07/23.
 */
var db = require('./BaseModel')

//////设置模型名字
const TableName = "AdminUser"



// db.dal.setTableName(TableName)

//var adminUser = new db.dal(TableName)


var dal = new db.dal(TableName)//Object.create(db.dal);
// dal.setTableName(TableName)

/**
 * AdminUser 模型
 */

/**
 * 初始化管理员信息
 * 如果admin_users管理员信息表中不存在user_name="admin"的用户 那么初始化该用户
 */
db.db[TableName].count({
    user_name: "admin"
}, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        if (res == 0) {
            var user = new db.db[TableName]({
                user_name: "admin",
                pwd: "admin",
                is_encrypt: 0
            })
            user.save((err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('初始化管理员信息完成')
                }
            })
        }
    }
})

dal.findByID = function(){
  console.log('adminUser中find by id')
}



module.exports = {
    dal: dal,
    db:db.db
}
