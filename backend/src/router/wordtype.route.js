const router = require('express').Router()
const controller = require('../controller/wordtype.controller')
const restricted = require('../auth/authenticate');
const adminOnly = require('../auth/adminOnly');
const selfOnly = require('../auth/selfOnly');


//router.post('/', controller.addCollection)
// router.post('/withAddress', controller.createWithAddress)
router.get('/', controller.findAll)
router.get('/filter', controller.findWithFilter)
router.get('/count', restricted, adminOnly, controller.count);
router.get('/:id', controller.findOne)
// router.put('/:id', controller.update)
// router.delete('/:id', controller.delete)

module.exports = router