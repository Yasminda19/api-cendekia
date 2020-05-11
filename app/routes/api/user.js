const express = require('express')

const router = express.Router()

const auth = require('../../middleware/auth')
const user = require('../../controllers/user');


router.post('/auth/register', user.register)
router.put('/auth', user.register) // alias?

router.post('/auth/login', user.login)
router.post('/auth/logout', auth, user.logout)
router.post('/auth/logoutall', auth, user.logoutall)

router.get('/auth', auth, async (req, res) => {
    // View logged in user profile
    res.send(req.user)
})

module.exports = router