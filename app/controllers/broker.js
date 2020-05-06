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
        const {id} = req.params
        Broker.deleteOne({ _id: id }, function (err) {
            throw new Error('Bad request')
        })
        res.send({success: true})
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

const update = (req, res) => {
    try {
        const {name, url} = req.body
        const {id} = req.params
        const broker = Broker.findOneAndUpdate({_id: id}, {name: name, url: url})
        await broker.save()
        res.send({ success: true, data: {name: name, url: url, token: token } })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

const generateNewToken = (req, res) => {
    try {
        const {id} = req.params
        const token = uuid.v4()
        Broker.findOneAndUpdate({_id: id}, {token: token})
        res.send({ success: true, data: {token: token} })
    } catch (err) {
        res.status(500).send({ success: false, error: err })
    }
}

const getOne = async (req, res) => {
    try {
        const {id} = req.params
        const res = await Broker.findOne({ _id: id }).exec()
        res.send({success: true, data: res})
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

const getAll = async (req, res) => {
    try {
        const res = await Broker.find({}).exec()
        res.send({success: true, data: res})
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

module.exports = Object.assign({}, {create, remove, update, getOne, getAll, generateNewToken});
