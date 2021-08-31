const authHandler = require('./autHandler')
const router = require('express').Router()

router.post('/login', authHandler.login)


module.exports = router