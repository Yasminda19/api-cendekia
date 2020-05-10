const redis = require('redis');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const Broker = require('../models/broker');
const User = require('../models/user');
const { redisUrl } = require('../../config');
const { genJsonWebToken } = require('./jwt');

const client = redis.createClient(redisUrl);

const login = async (req, res) => {
    const { url } = req.query; // redirect

    try {
        if (url !== undefined) {
            const parse_url = new URL(url);
            const broker = await Broker.findOne({ url: parse_url.origin }).exec();
            if (!broker)
                throw { code: "SSO21", message: "URL are not in-scope to access the SSO." };
            if (req.session.user !== undefined && url == undefined)
                return res.redirect("/"); // TODO: create main page to manage account
            if (req.session.user !== undefined && url !== undefined) {
                client.get(`${ssoToken}.id`, (err, id) => {
                    if (err) throw err;
                    if (id !== req.session.user)
                        throw { code: "SSO22", message: "User mismatch." };
                });
                const ssoToken = uuid.v4();
                client.set(`${ssoToken}.origin`, parse_url.origin);
                client.set(`${ssoToken}.token`, broker.token);
                // client.set(`${ssoToken}.id`, req.session.user);
                return res.redirect(`${url}?ssoToken=${ssoToken}`);
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
        if (url !== undefined) {
            const parse_url = new URL(url);
            const broker = await Broker.findOne({ url: parse_url.origin }).exec();
            if (!broker)
                throw { code: "SSO11", message: "URL are not in-scope to access the SSO." };
        }
        const user = await User.findOne({ email: email }).exec();
        if (!user)
            throw { code: "SSO12", message: "Unauthorized. Invalid Email or Password" };
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch)
            throw { code: "SSO12", message: "Unauthorized. Invalid Email or Password" };
        const ssoToken = uuid.v4();
        const userID = uuid.v4();
        req.session.user = userID;
        client.set(`${ssoToken}.id`, userID);
        if (url !== undefined) {
            client.set(`${ssoToken}.origin`, parse_url.origin);
            client.set(`${ssoToken}.token`, broker.token);
            return res.redirect(`${url}?ssoToken=${ssoToken}`); // frontend
        } else {
            return res.json({ success: true }); // TODO
        }
    } catch (err) {
        res.json({ error: err });
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
        client.get(`${ssoToken}.id`, (err, token) => {
            if (err)
                throw { code: "SSO02", message: "Something went horribly wrong on our end." };
            if (token !== req.session.user)
                throw { code: "SSO04", message: "Unauthorized. Invalid SSO token." };
        });
        client.get(`${ssoToken}.token`, (err, token) => {
            if (err)
                throw { code: "SSO02", message: "Something went horribly wrong on our end." };
            if (token !== appToken)
                throw { code: "SSO04", message: "Unauthorized. Invalid SSO token." };
        });
        client.get(`${ssoToken}.origin`, (err, token) => {
            if (err)
                throw { code: "SSO02", message: "Something went horribly wrong on our end." };
            if (token !== parse_url.origin)
                throw { code: "SSO05", message: "Unauthorized. SSO token and URL origin didn't match." };
        });
        res.json({ success: true, token: genJsonWebToken(payload) });
    } catch (err) {
        res.json({ error: err });
    }
};

module.exports = Object.assign({}, { login, doLogin, verifyToken });