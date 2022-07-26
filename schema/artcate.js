const joi = require("joi")

const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().min(1).required()
// 验证新增文章分类
exports.add_cate_schema = {
    body: {
        name,
        alias,
    }
}
// 验证删除文章分类
exports.del_cate_schema = {
    params: {
        id
    }
}
// 验证获取文章分类
exports.get_cate_schema = {
    params: {
        id
    }
}
// 验证更新文章分类
exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias
    }
}