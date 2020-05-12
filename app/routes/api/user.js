const express = require('express')

const router = express.Router()

const auth = require('../../middleware/auth')
const user = require('../../controllers/user');


router.post('/auth/register', user.register)
router.put('/auth', user.register) // alias?

router.get('/auth', user.getUsers)

module.exports = router