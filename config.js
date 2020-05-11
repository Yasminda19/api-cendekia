const fs = require('fs');

const dburl = process.env.DATABASE_URI || "mongodb://localhost:32769/admin"
const jwtKeyPath = process.env.JWT_KEY || "jwt.key"
const redisUrl = process.env.REDIS_URL || "redis://localhost:32768"
const secret = process.env.SESS_SECRET || "thisissupposedtobesecretbutmeh"

const jwtKey = fs.readFileSync(__dirname + jwtKeyPath, 'utf8');

module.exports = {
    dburl: dburl,
    jwtKey: jwtKey,
    redisUrl: redisUrl,
    secret: secret
}
