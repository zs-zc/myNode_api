const express = require("express")
const route = express.Router()

// 导入验证数据中间件
const expressJoi = require("@escook/express-joi")
// 导入需要验证的规则对象
const { add_cate_schema } = require("../schema/artcate")
// 导入对应的路由事件
const artcateHandle = require("../router_handle/artcate")
// 获取文章分类列表
route.get("/cates", artcateHandle.getartcateList)
// 新增文章
route.post("/addcates", expressJoi(add_cate_schema), artcateHandle.addArtcate)
module.exports = route