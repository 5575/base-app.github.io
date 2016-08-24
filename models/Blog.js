/**
 * Created by yuluo on 16/07/23.
 */
var db = require('./BaseModel')

//////设置模型名字
const TableName = "Blog"

// db.dal.setTableName(TableName)

// const dal = Object.create(db.dal)
var dal = new db.dal(TableName)
module.exports = {
    dal:dal,
    db:db.db
}
