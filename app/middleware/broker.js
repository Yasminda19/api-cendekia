const Broker = require('../models/broker')
const config = require('../../config')

// const broker = async(req, res, next) => {
//     const appToken = req.header('Authorization').replace('Bearer ', '')
//     const { ssoToken } = req.query

//     try {
//         // TODO: ganti ke redis? ini pricey banget ke db
//         const token = await User.findOne({ 'tokens.token': ssoToken })
//         const site = await 
//         if (!token || !site == null) {
//             throw new Error('Not authorized to access this resource')
//         }        
//     } catch (err) {
//         res.status(401).send({ error: err })
//     }

//     token = 
//     next()
// }

// const basicauth = 

module.exports = broker