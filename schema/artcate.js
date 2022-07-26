const joi = require("joi")

const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().min(1).required()
exports.add_cate_schema = {
    body: {
        name,
        alias,
    }
}

exports.del_cate_schema = {
    params: {
        id
    }
}