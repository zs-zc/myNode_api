const express = require("express")
const router = express.Router()

const userMessage = require("../router_handle/user")

router.post("/reguser", userMessage.reguser)

router.post("/login", userMessage.login)

module.exports = router