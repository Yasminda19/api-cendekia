const auth = require('../middleware/auth')
const broker = require('../controllers/broker')

module.exports = (app) => {
    app.post('/api/auth/register', user.register)
    app.put('/api/auth', user.register) // alias?

    app.post('/api/auth/login', user.login)
    app.post('/api/auth/logout', auth, user.logout)
    app.post('/api/auth/logoutall', auth, user.logoutall)

    app.post('/api/auth/verifyToken', auth, )

    app.get('/api/auth', auth, async(req, res) => {
        // View logged in user profile
        res.send(req.user)
    })
}
