const router = require('express').Router()
const controller = require('../controller/image.controller')
const {imageUpload} = require('../middleware/image_upload')
const {resize} = require('../middleware/image_resize')
const restricted = require('../auth/authenticate');
const adminOnly = require('../auth/adminOnly');
const selfOnly = require('../auth/selfOnly');



router.post('/', imageUpload, resize,controller.myUpload)
router.get('/', controller.getFile)
router.get('/url', controller.getUrl)

module.exports = router