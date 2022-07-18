const express = require("express")

const app = express()

// 导入中间件
const cors = require("cors")
app.use(cors())

// 解析表单数据
app.use(express.urlencoded({ extended: false }))  // 解析数据表单要在 路由之前
// 导入路由
const userRouter = require("./router/user")
app.use('/api', userRouter)

app.listen(2000, () => {
    console.log('api server running at http://127.0.0.1:2000');
})