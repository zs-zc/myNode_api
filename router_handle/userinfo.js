// 导入数据库
const db = require("../db/index")
// 导入密码库
const bcrypt = require("bcryptjs")
// 获取用户信息的路由事件
exports.getUserInfo = (req, res) => {

    const sql = `select id,username,nickname,email,user_pic from ev_users where id=?`
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc("获取用户数据失败")
        res.send({
            status: 0,
            message: "获取用户数据成功",
            data: results[0]
        })
    })
}
// 修改路由事件
exports.updateUserInfo = (req, res) => {

    const sql = `update ev_users set ? where id=?`
    db.query(sql, [req.body, req.body.id], (err, results) => {
        // console.log(results, '修改的结果');
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc("更新用户的基本信息失败")
        res.cc('更新用户信息成功', 0)
    })
}
// 修改用户密码
exports.updatepwd = (req, res) => {
    const sql = `select * from ev_users where id=?`

    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc("用户不存在")
        const isPwdTrue = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!isPwdTrue) return res.cc("旧密码错误")
        const sql = `update ev_users set password=? where id=?`
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc("更新密码失败")
            res.cc("更新密码成功", 0)
        })
    })




}