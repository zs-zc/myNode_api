// 导入数据库
const db = require("../db/index")
const bcrypt = require("bcryptjs")
exports.reguser = (req, res) => {
    const userInfo = req.body
    if (!userInfo.username || !userInfo.password) {
        return res.send({ status: 1, message: "用户名或密码不合法" })
    }
    // 定义sql语句
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, userInfo.username, (err, results) => {
        if (err) {
            return res.send({ ststus: 1, message: err.message })
        }
        if (results.length > 0) {
            return res.send({ ststus: 1, message: '用户名已被占用，请切换' })

        }
        //调用bcrypt.hashSync进行加密
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)
        const sql = 'insert into ev_users set ?'
        db.query(sql, { username: userInfo.username, password: userInfo.password }, (err, results) => {
            if (err) return res.send({ status: 1, message: err.message })
            if (results.affectedRows !== 1) return res.send({ status: 1, message: "注册用户失败，请稍后再试" })
            res.send({ status: 0, message: "注册成功" })
        })
    })
}

exports.login = (req, res) => {
    res.send('login ok')
}