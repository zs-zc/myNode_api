const express = require("express")
const route = express.Router()

// 导入校验规则插件
const expressJoi = require("@escook/express-joi")
const { update_userinfo_schema, update_userpassword_schema, update_userAvatar_schema } = require("../schema/user")
// 导入路由事件
const getUserInfoHandle = require("../router_handle/userinfo")
// 获取用户信息
route.get("/userinfo", getUserInfoHandle.getUserInfo)
// 修改用户信息
route.post("/updateUserinfo", expressJoi(update_userinfo_schema), getUserInfoHandle.updateUserInfo)
// 修改用户密码
route.post("/updatepwd", expressJoi(update_userpassword_schema), getUserInfoHandle.updatepwd)
// 用户头像
route.post("/update/avatar", expressJoi(update_userAvatar_schema), getUserInfoHandle.updateAvatar)

module.exports = route