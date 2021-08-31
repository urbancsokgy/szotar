const router = require('express').Router()
const controller = require('../controller/user.controller')
const restricted = require('../auth/authenticate');
const adminOnly = require('../auth/adminOnly');
const selfOnly = require('../auth/selfOnly');


router.post('/', controller.addUser)
router.post('/withAddress', controller.createWithAddress)
router.get('/', controller.findAll)
router.get('/count', controller.count);
router.get('/basicdata', controller.basicdata);
router.get('/prop/', controller.findOne)
router.get('/:id', controller.finddById)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router