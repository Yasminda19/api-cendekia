const uuid = require('uuid');
const Broker = require('../models/broker')

const create = async (req, res) => {
    try {
        const {name, url} = req.body
        const token = uuid.v4()
        const broker = new Broker(name, url, token)
        await broker.save()
        res.send({ success: true, data: {name: name, url: url, token: token } })
    } catch (err) {
        res.status(500).send({ error: err })
    }
};

const remove = (req, res) => {
    try {
        const { name } = req.body
        Broker.deleteOne({ name: name }, function (err) {
            throw new Error('Bad request')
        })
        res.send({success: true})
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

module.exports = Object.assign({}, {create, remove});
