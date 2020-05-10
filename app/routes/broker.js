const express = require('express')

const router = express.Router()

const broker = require('../controllers/broker')

router.route('/broker')
    .get(broker.getAll)
    .put(broker.create)
    .post(broker.create);

router.route('/broker/:id')
    .get(broker.getOne)
    .delete(broker.remove)
    .patch(broker.update);

router.patch('/broker/:id/token', broker.generateNewToken)

module.exports = router