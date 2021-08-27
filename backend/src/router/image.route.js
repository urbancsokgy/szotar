const router = require('express').Router()
const controller = require('../controller/image.controller')
const {imageUpload} = require('../middleware/image_upload')


router.post('/', imageUpload, controller.myUpload)
router.get('/', controller.getFile)


// router.post('/', controller.addUser)
// router.post('/withAddress', controller.createWithAddress)
// router.get('/', controller.findAll)
// router.get('/count', controller.count);
// router.get('/basicdata', controller.basicdata);
// router.get('/:id', controller.findOne)
// router.put('/:id', controller.update)
// router.delete('/:id', controller.delete)

module.exports = router