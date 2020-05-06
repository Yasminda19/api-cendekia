const auth = require('../middleware/auth')
const broker = require('../controllers/broker')

module.exports = (app) => {
    app.get('/api/broker', broker.getAll)

    app.put('/api/broker', broker.create)
    app.post('/api/broker', broker.create)

    app.get('/api/broker/:id', broker.getOne)
    app.delete('/api/broker/:id', broker.remove)
    app.patch('/api/broker/:id', broker.update)

    app.patch('/api/broker/:id/token', broker.generateNewToken)
}
