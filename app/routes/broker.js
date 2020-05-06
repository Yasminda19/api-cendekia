const express = require('express')

const router = express.Router()

const broker = require('../controllers/broker')

router.route('/broker')
    .get(broker.getAll)
    .put('/broker', broker.create)
    .post('/broker', broker.create);

router.route('/broker/:id')
    .get('/broker/:id', broker.getOne)
    .delete('/broker/:id', broker.remove)
    .patch('/broker/:id', broker.update);

router.patch('/broker/:id/token', broker.generateNewToken)

module.exports = router