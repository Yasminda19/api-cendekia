const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const url = require('url'); // built-in utility
const session = require("express-session");
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
    session({
        secret: "damnthatsnotcute",
        resave: false,
        saveUninitialized: true
    })
);


const appToken = "11e7aea8-4394-4393-8f45-d70f893adb8c";

const publicKey = fs.readFileSync("../jwt.key.pub", 'utf8');

const verifyJwtToken = token =>
    new Promise((resolve, reject) => {
        jwt.verify(
            token,
            publicKey,
            { issuer: "Insan Cendekia Baznas", algorithms: ["RS256"] },
            (err, decoded) => {
                if (err) return reject(err);
                return resolve(decoded);
            }
        );
    });

// simple middleware
const auth = async (req, res, next) => {
    const { ssoToken } = req.query;

    if (ssoToken !== undefined) {
        try {
            const response = await fetch(`http://localhost:3000/sso/verifyToken?ssoToken=${ssoToken}`, {
                method: "get",
                headers: {
                    "Authorization": `Bearer ${appToken}`
                },
            });
            const { token } = await response.json();
            const decoded = await verifyJwtToken(token);
            req.session.user = decoded;
        } catch (err) {
            return next(err);
        }
        return res.redirect(url.parse(req.url).pathname);;
    }
    return next();
}

const checkAuth = async (req, res, next) => {
    const redirectURL = `${req.protocol}://${req.headers.host}${req.path}`;
    if (req.session.user === undefined) {
        return res.redirect(`http://localhost:3000/sso/login?url=${redirectURL}`);
    }
    return next();
};


app.use(auth);

app.get("/", checkAuth, (req, res) => {
    if (req.session.user)
        res.json({ "message": req.session.user });
    else
        res.json({ "message": "connected." });
});

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});
