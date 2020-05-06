const express = require('express')

const router = express.Router()
const sso = require('../controllers/sso')

router.route('/login')
    .get(sso.login)
    .post(sso.doLogin)

router.get("/verifyToken", sso.verifySsoToken)

module.exports = router