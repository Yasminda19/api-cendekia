const dburl =
  process.env.DATABASE_URI ||
  "mongodb+srv://admin:dbUserPassword@cluster0-pkarp.mongodb.net/test?retryWrites=true&w=majority";
// local mongodb://localhost:27017/admin";
// atlas "mongodb+srv://admin:dbUserPassword@cluster0-pkarp.mongodb.net/test?retryWrites=true&w=majority";
const jwtKey = process.env.JWT_KEY || "jwtisnotawesomedamn";

module.exports = {
  dburl: dburl,
  jwtKey: jwtKey,
};
