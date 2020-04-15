const User = require('../models/user')
const auth = require('../middleware/auth')
const user = require('../controllers/user');

/api/auth/login
/api/auth/logout
module.exports = (app) => {
    app.post('/api/auth/register', user.register)
    app.put('/api/auth', user.register) // alias?

    app.post('/api/auth/login', user.login)
    app.post('/api/auth/logout', auth, user.logout)
    app.post('/api/auth/logoutall', auth, user.logoutall)

    app.get('/api/auth', auth, async(req, res) => {
        // View logged in user profile
        res.send(req.user)
    })
}
