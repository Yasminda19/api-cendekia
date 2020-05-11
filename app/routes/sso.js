const express = require('express')

const router = express.Router()
const sso = require('../controllers/sso')

router.route('/login')
    .get(sso.login)
    .post(sso.doLogin);

router.route('/register')
    .get(sso.register);

router.get("/verifyToken", sso.verifyToken);

router.get("/logout", sso.logout)

module.exports = router