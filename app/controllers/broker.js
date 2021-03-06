const uuid = require('uuid');
const Broker = require('../models/broker')

const create = async (req, res) => {
    try {
        const { name, url } = req.body
        const parse_url = new URL(url);
        const token = uuid.v4()
        const broker = new Broker({ name: name, url: parse_url.origin, token: token })
        await broker.save()
        res.json({ success: true, data: broker })
    } catch (err) {
        res.status(500).json({ success: false, error: err })
    }
};

const remove = (req, res) => {
    try {
        const { id } = req.params
        const broker = Broker.findOneAndDelete({ _id: id }).exec()
        res.json({ success: true, data: { _id: id } })
    } catch (err) {
        res.status(500).json({ success: false, error: err })
    }
}

const update = (req, res) => {
    try {
        const { name, url } = req.body
        if (name === undefined || url === undefined)
            throw { "message": "name or url can't be empty" }
        if (!(url.startsWith('http://') || url.startsWith('https://')))
            throw { "message": "url must start with http:// or https://" }
        const { id } = req.params
        Broker.findOneAndUpdate({ _id: id }, { name: name, url: url }).exec()
        res.json({ success: true, data: { _id: id, name: name, url: url } })
    } catch (err) {
        res.status(500).json({ success: false, error: err })
    }
}

const generateNewToken = (req, res) => {
    try {
        const { id } = req.params
        const token = uuid.v4()
        Broker.findOneAndUpdate({ _id: id }, { token: token }).exec()
        res.json({ success: true, data: { _id: id, token: token } })
    } catch (err) {
        res.status(500).json({ success: false, error: err })
    }
}

const getOne = async (req, res) => {
    try {
        const { id } = req.params
        const broker = await Broker.findOne({ _id: id })
        res.json({ success: true, data: broker })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

const getAll = async (req, res) => {
    try {
        const brokers = await Broker.find({})
        res.json({ success: true, data: brokers })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

const brokerView = async (req, res) => {
    try {
        const brokers = await Broker.find({}).exec();
        res.render("broker", { brokers: brokers });
    } catch (err) {
        res.status(502).json(err);
    }
};

module.exports = Object.assign({}, { create, remove, update, getOne, getAll, generateNewToken, brokerView });
