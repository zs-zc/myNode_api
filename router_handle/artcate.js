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
    const sql = `select * from ev_article_cate where name=? or alias=?`
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('分类名称与分类别名被占用，请更换后重试')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias)
            return res.cc("分类名称与分类别名被占用，请更换后重试")
        if (results.length === 1 && results[0].name === req.body.name) return res.cc("分类名称被占用，请更换后重试")
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc("分类别名被占用，请更换后重试")
        // 插入文章
        const sql = `insert into ev_article_cate set ?`
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc("新增文章分类失败")
            res.cc("新增文章分类成功", 0)
        })

    })
}
// 删除文章分类
exports.delArtcate = (req, res) => {
    const sql = `update ev_article_cate set is_delete=1 where id=?`
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc("删除文章分类失败")
        res.cc("删除成功", 0)
    })
}
// id获取文章分类
exports.detailArtcate = (req, res) => {
    const sql = `select * from ev_article_cate where id=?`
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc("获取文章分类详情失败")
        res.send({
            status: 0,
            message: '详情数据获取成功',
            data: results[0]
        })
    })

}