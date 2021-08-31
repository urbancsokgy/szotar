const router = require('express').Router()
const controller = require('../controller/address.controller')
const restricted = require('../auth/authenticate');
const adminOnly = require('../auth/adminOnly');
const selfOnly = require('../auth/selfOnly');


router.post('/', controller.addNewAddress)
router.get('/', controller.findAll)
router.get('/count', controller.count);
router.get('/basicdata', controller.basicdata);
router.get('/:id', controller.findOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router