const dburl = process.env.DATABASE_URI || "mongodb://localhost:32769/admin"
const jwtKey = process.env.JWT_KEY || "jwtisnotawesomedamn"
const redisUrl = process.env.REDIS_URL || "redis://localhost:32768"
const secret = process.env.SESS_SECRET || "thisissupposedtobesecretbutmeh"

module.exports = {
    dburl: dburl,
    jwtKey: jwtKey,
    redisUrl: redisUrl,
    secret: secret
}
