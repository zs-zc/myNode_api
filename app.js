const express = require("express")

const app = express()
// 引入校验规则插件
const joi = require("joi")

//引入解析token的插件
const expressJWT = require("express-jwt")
const config = require("./config")
// 导入中间件
const cors = require("cors")
app.use(cors())
// 解析表单数据
app.use(express.urlencoded({ extended: false }))  // 解析数据表单要在 路由之前
// 在路由之前封装res.cc函数
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})
// 配置解析token中间件
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }))

// 导入路由
const userRouter = require("./router/user")
app.use('/api', userRouter)

// 定义错误级别的中间件
app.use((err, req, res, next) => {
    console.log(err, 'err');
    if (err instanceof joi.ValidationError) return res.cc(err)
    if (err.name === "UnauthorizedError") return res.cc("认证失败")
})

app.listen(2000, () => {
    console.log('api server running at http://127.0.0.1:2000');
})