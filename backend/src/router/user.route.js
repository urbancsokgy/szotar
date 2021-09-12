const router = require('express').Router()
const controller = require('../controller/user.controller')
const restricted = require('../auth/authenticate');
const adminOnly = require('../auth/adminOnly');
const selfOnly = require('../auth/selfOnly');
const { imageUpload } = require('../middleware/image_upload')
const { resize } = require('../middleware/image_resize')


router.post('/',  imageUpload, resize(800, 'avatar'), controller.addUser)
router.post('/withAddress', imageUpload, resize(800, 'avatar'), controller.createWithAddress)
router.get('/', controller.findAll)
router.get('/filter', controller.findWithFilter)
router.get('/count', controller.count);
router.get('/basicdata', controller.basicdata);
router.get('/prop/', controller.findOne)
router.get('/:id', controller.finddById)
router.put('/:id',  imageUpload, resize(800, 'avatar'), controller.update)
router.delete('/:id', controller.delete)


module.exports = router