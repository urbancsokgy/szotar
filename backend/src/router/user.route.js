const router = require('express').Router()
const controller = require('../controller/user.controller')

router.post('/', controller.addUser)
router.post('/withaddress', controller.createWithAddress)
router.get('/', controller.findAll)
router.get('/count', controller.count);
router.get('/basicdata', controller.basicdata);
router.get('/:id', controller.findOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router