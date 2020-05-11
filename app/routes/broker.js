const express = require('express')

const router = express.Router()

const { brokerView,  } = require('../controllers/broker')

router.get('/broker', brokerView);

router.get('/broker/add', async (req, res) => {
    res.render("brokeradd");
});

module.exports = router