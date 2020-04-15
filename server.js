const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const config = require('./config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(config.dburl, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Require users routes
// require('./app/routes/something')(app);
require('./app/routes/user')(app);

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "connected."});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
