// 导入数据库
const db = require("../db/index")
const bcrypt = require("bcryptjs")

// 导入token包
const jwt = require("jsonwebtoken")
const config = require("../config")
exports.reguser = (req, res) => {
    let userInfo = req.body
    console.log(userInfo, 'userInfo');
    // if (!userInfo.username || !userInfo.password) {
    //     return res.cc("用户名或密码不合法")
    // }
    // 定义sql语句
    let sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, userInfo.username, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length > 0) {
            return res.cc('用户名已被占用，请切换')

        }
        //调用bcrypt.hashSync进行加密---暂时先去掉
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)
        let sql = 'insert into ev_users set ?'
        db.query(sql, { username: userInfo.username, password: userInfo.password }, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc("注册用户失败，请稍后再试")
            res.cc("注册成功", 0)
        })
    })
}

exports.login = (req, res) => {
    let userInfo = req.body
    let sqlLogin = `select * from ev_users where username=?`
    db.query(sqlLogin, userInfo.username, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        // console.log(results[0], 'results');
        if (results.length !== 1) {
            return res.cc('登录失败')
        }
        const isPsd = bcrypt.compareSync(userInfo.password, results[0].password)  // (用户输入密码，数据库密码)
        // console.log(isPsd, '校验传输密码与数据库密码的正确性');
        if (!isPsd) {
            res.cc('登录失败')
        } else {
            const user = { ...results[0], password: "", user_pic: "" }
            // 生成Token
            const token = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
            res.send({
                status: 0,
                message: "登录成功",
                token: "Bearer " + token
            })
        }
    })
}