const express = require("express")
const route = express.Router()

// 导入验证数据中间件
const expressJoi = require("@escook/express-joi")
// 导入需要验证的规则对象
const { add_cate_schema, del_cate_schema } = require("../schema/artcate")
// 导入对应的路由事件
const artcateHandle = require("../router_handle/artcate")
// 获取文章分类列表
route.get("/cates", artcateHandle.getartcateList)
// 新增文章
route.post("/addcates", expressJoi(add_cate_schema), artcateHandle.addArtcate)
// 删除文章分类
route.get("/deletecate/:id", expressJoi(del_cate_schema), artcateHandle.delArtcate)
// 根据id获取文章
route.get("/cates/:id", expressJoi(del_cate_schema), artcateHandle.detailArtcate)

module.exports = route