const express = require("express");
const bodyParser = require("body-parser");

// create express app
const app = express();

// parse requests of content-type
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
// this is for local db
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
// this for mongoDB atlas and actually this is not save and
// we need to create .env file so we can store the string
const uri =
  "mongodb+srv://admin:dbUserPassword@cluster0-pkarp.mongodb.net/test?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;

// Connecting to the database
// just change the 'uri' to 'dbConfig' if you want run locally or on atlas
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// Require users routes
// require('./app/routes/something.routes.js')(app);
require("./app/routes/user.routes.js")(app);

// define a simple route
app.get("/", (req, res) => {
  res.json({ message: "connected." });
});

// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
