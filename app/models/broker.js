const mongoose = require('mongoose')

const brokerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    url: {
        type: String,
        required: true,
    },
    token: {
        unique: true,
        type: String,
        required: true
    }
})

const Broker = mongoose.model('Broker', brokerSchema)

module.exports = Broker