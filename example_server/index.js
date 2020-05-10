const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "connected."});
});

// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 3000");
});
