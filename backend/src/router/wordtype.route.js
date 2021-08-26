const router = require('express').Router()
const controller = require('../controller/wordtype.controller')

//router.post('/', controller.addCollection)
// router.post('/withAddress', controller.createWithAddress)
router.get('/', controller.findAll)
router.get('/count', controller.count);
router.get('/:id', controller.findOne)
// router.put('/:id', controller.update)
// router.delete('/:id', controller.delete)

module.exports = router