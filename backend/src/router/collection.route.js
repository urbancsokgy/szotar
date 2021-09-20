const router = require('express').Router()
const controller = require('../controller/collection.controller')
const restricted = require('../auth/authenticate');
const adminOnly = require('../auth/adminOnly');
const selfOnly = require('../auth/selfOnly');
const { imageUpload } = require('../middleware/image_upload')
const { resize } = require('../middleware/image_resize')


router.post('/',  imageUpload('image'), resize(600, 'collection'), controller.addCollection)
router.get('/', controller.findAll)
router.get('/filter', controller.findWithFilter)
router.get('/count', controller.count);
router.get('/:id', controller.findOne)
router.put('/:id',  imageUpload('image'), resize(600, 'collection'), controller.update)
router.delete('/:id', controller.delete)

module.exports = router