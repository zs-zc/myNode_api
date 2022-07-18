const mysql = require("mysql")

const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "123123",
    database: "my_db_02",
})

module.exports = db