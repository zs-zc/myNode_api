// 导入数据库
const db = require("../db/index")
const bcrypt = require("bcryptjs")


exports.reguser = (req, res) => {
    const userInfo = req.body
    console.log(userInfo, 'userInfo');
    // if (!userInfo.username || !userInfo.password) {
    //     return res.cc("用户名或密码不合法")
    // }
    // 定义sql语句
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, userInfo.username, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length > 0) {
            return res.cc('用户名已被占用，请切换')

        }
        //调用bcrypt.hashSync进行加密
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)
        const sql = 'insert into ev_users set ?'
        db.query(sql, { username: userInfo.username, password: userInfo.password }, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc("注册用户失败，请稍后再试")
            res.send("注册成功", 0)
        })
    })
}

exports.login = (req, res) => {
    res.send('login ok')
}