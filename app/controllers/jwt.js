const jwt = require("jsonwebtoken");
const config = require("../../config");

const genJsonWebToken = payload =>
    new Promise((resolve, reject) => {
        jwt.sign(
            { ...payload },
            config.jwtKey,
            {
                algorithm: "RS256", // use asymmetric encription
                expiresIn: "1h",
                issuer: "SSO Insan Cendekia Baznas"
            },
            (err, token) => {
                if (err) return reject(err);
                return resolve(token);
            }
        );
    });

module.exports = Object.assign({}, { genJsonWebToken });
