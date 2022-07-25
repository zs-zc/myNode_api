// 导入数据库
const db = require("../db/index")

// 获取文章分类列表
exports.getartcateList = (req, res) => {
    const sql = `select * from ev_article_cate where is_delete=0 order by id asc`
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({ status: 0, message: '获取成功', data: results })
    })
}
// 新增文章
exports.addArtcate = (req, res) => {
    res.send("ok---")
}