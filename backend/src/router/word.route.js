const router = require('express').Router()
const controller = require('../controller/word.controller')
const { imageUpload } = require('../middleware/image_upload')
const { resize } = require('../middleware/image_resize')

router.post('/', imageUpload, resize, controller.addWord)
router.get('/', controller.findAll)
router.get('/basic', controller.findAllBasic)
router.get('/count', controller.count);
router.get('/:id', controller.findOne)
router.put('/:id', imageUpload, resize, controller.update)
router.delete('/:id', controller.delete)

module.exports = router