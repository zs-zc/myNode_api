const express = require("express")
const router = express.Router()

// 导入验证路由对应的模块
const user_handler = require("../router_handle/user")

//导入验证数据中间件
const expressJoi = require("@escook/express-joi")

// 导入需要验证规则对象
const { reg_login_schema } = require("../schema/user")


router.post("/reguser", expressJoi(reg_login_schema), user_handler.reguser)

router.post("/login", user_handler.login)

module.exports = router