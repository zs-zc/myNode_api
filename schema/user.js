// 导入定义验证规则包
const joi = require("joi")

// 定义用户名和密码验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
// 定义id,nickname,email 校验规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

// 定义验证注册和登录表单的数据规则对象
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}
// 定义修改用户信息数据规则对象
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}
// 定义修改用户密码数据规则对象
exports.update_userpassword_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}