const redis = require('redis');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const { promisify } = require("util");

const Broker = require('../models/broker');
const User = require('../models/user');
const { redisUrl } = require('../../config');
const { genJsonWebToken } = require('./jwt');

const client = redis.createClient(redisUrl);
const getAsync = promisify(client.get).bind(client);

const login = async (req, res) => {
    const { url } = req.query; // redirect

    try {
        if (url !== undefined) {
            const parse_url = new URL(url);
            const broker = await Broker.findOne({ url: parse_url.origin }).exec();
            if (!broker)
                throw { code: "SSO21", message: "URL are not in-scope to access the SSO." };
            if (req.session.user !== undefined) {
                const ssoToken = uuid.v4();
                client.set(`${ssoToken}.id`, req.session.user);
                client.set(`${ssoToken}.token`, broker.token, 'EX', 3600);
                return res.redirect(`${url}?ssoToken=${ssoToken}`);
            } else {
                return res.render("login-cendekia");
            }
        } else {
            return res.render("login-cendekia");
            // res.json({ success: true });
        }
    } catch (err) {
        res.json({ error: err });
    }
};

const doLogin = async (req, res) => {
    const { url } = req.query; // redirect
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email }).exec();
        if (!user)
            throw { code: "SSO12", message: "Unauthorized. Invalid Email or Password" };
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch)
            throw { code: "SSO12", message: "Unauthorized. Invalid Email or Password" };
        const ssoToken = uuid.v4();
        if (req.session.user === undefined) {
            const userID = uuid.v4();
            req.session.user = userID;
        }
        client.set(`${ssoToken}.id`, req.session.user, 'EX', 3600);
        client.set(`user.${req.session.user}`, user.email);
        if (url !== undefined) {
            const parse_url = new URL(url);
            const broker = await Broker.findOne({ url: parse_url.origin }).exec();
            if (!broker)
                throw { code: "SSO11", message: "URL are not in-scope to access the SSO." };
            client.set(`${ssoToken}.token`, broker.token, 'EX', 3600);
            return res.redirect(`${url}?ssoToken=${ssoToken}`); // frontend
        } else {
            return res.json({ success: true }); // TODO
        }
    } catch (err) {
        res.json({ error: err });
    }
};


const logout = async (req, res) => {
    try {
        if (req.session.user !== undefined) {
            client.del(`user.${req.session.user}`);
            req.session.destroy();`${ssoToken}.token`
        }
        return res.redirect('/sso/login');
    } catch (err) {
        return res.json({ error: err });
    }
};

const verifyToken = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        if (authHeader === undefined || typeof authHeader !== "string")
            throw { code: "SSO01", message: "Missing application authorization token." };
        const appToken = authHeader.slice(7); // strip "Bearer " from auth header
        const { ssoToken } = req.query;
        if (appToken === "")
            throw { code: "SSO01", message: "Missing application authorization token." };
        getAsync(`${ssoToken}.token`)
            .then((token) => {
                if (token !== appToken)
                    throw { code: "SSO04", message: "Unauthorized. Invalid SSO token." };
            })
            .catch((err) => {
                throw { code: "SSO02", message: "Something went horribly wrong on our end." };
            });
        const userSessionID = await getAsync(`${ssoToken}.id`)
            .catch((err) => {
                throw { code: "SSO02", message: "Something went horribly wrong on our end." };
            });
        const email = await getAsync(`user.${userSessionID}`)
            .catch((err) => {
                throw { code: "SSO02", message: "Something went horribly wrong on our end." };
            });
        if (!email)
            return res.status(502).json({ code: "SSO04", message: "Unauthorized. Invalid SSO token." });
        const user = User.findOne({ email: email }).exec();
        if (!user)
            return res.status(502).json({ code: "SSO06", message: "Unauthorized. User not found." });
        const payload = {
            email: email,
            name: user.name,
            role: user.role
        };
        return res.json({ success: true, token: await genJsonWebToken(payload) });
    } catch (err) {
        res.json({ error: err });
    }
};

module.exports = Object.assign({}, { login, doLogin, verifyToken, logout });