const User = require('../models/user');
const Broker = require('../models/broker');

const register = async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
};

const login = async (req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }

};

const logout = async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
};

const logoutall = async (req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
};

const verifyToken = async (req, res) => {
    const appToken = req.header('Authorization').toLowerCase().replace('bearer ', '')
    const { token } = req.query; // SSO Token

    if (appToken == null || token == null) {
        return res.status(400).json({ error: "Bad Request!" })
    }

    const user = await User.findOne({ 'tokens.token': token })
    if (!user) {
        return res.status(401).send({ error: 'Verify token failed' })
    }

};

const getUsers = async (req, res) => {
    try {
        const query = req.query.q;
        const authHeader = req.headers["authorization"];
        if (authHeader === undefined || typeof authHeader !== "string")
            throw { code: "SSO01", message: "Missing application authorization token." };
        const appToken = authHeader.slice(7); // strip "Bearer " from auth header
        const broker = await Broker.findOne({ token: appToken }).exec();
        if (!broker)
            return res.status(401).json({ status: false, message: "Unauthorized." });
        if (query === undefined)
            const searchParam = {};
        else 
            const searchParam = JSON.parse(query);
        const users = await User.find(searchParam).exec();
        res.json({ success: true, data: users });
    } catch (err) {
        res.status(502).json({ error: err })
    }
}

module.exports = Object.assign({}, { register, login, logout, logoutall, getUsers });
