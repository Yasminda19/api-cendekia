const dburl = process.env.DATABASE_URI || 3000
const jwtKey = process.env.JWT_KEY || "jwtisnotawesomedamn"

module.exports = {
    dburl: dburl,
    jwtKey: jwtKey
}
