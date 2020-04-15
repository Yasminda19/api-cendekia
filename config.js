const dburl = process.env.DATABASE_URI || "mongodb://localhost:27017/admin"
const jwtKey = process.env.JWT_KEY || "jwtisnotawesomedamn"

module.exports = {
    dburl: dburl,
    jwtKey: jwtKey
}
