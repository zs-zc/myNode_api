const express = require("express")

const app = express()
const joi = require("joi")

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

// 导入路由
const userRouter = require("./router/user")
app.use('/api', userRouter)

// 定义错误级别的中间件
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) {
        res.cc(err)
    } else {
        res.cc(err)
    }
})

app.listen(2000, () => {
    console.log('api server running at http://127.0.0.1:2000');
})