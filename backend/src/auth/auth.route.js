const authHandler = require('./autHandler')
const router = require('express').Router()

router.post('/login', authHandler.login)
router.post('/refresh', authHandler.refresh);
router.post('/logout', authHandler.logout);


module.exports = router