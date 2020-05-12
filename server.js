const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const Eta = require('eta');

// create express app
const app = express();

// parse requests of content-type
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// static path
app.use('/static', express.static('public'));

// set frontned
app.set('view engine', 'eta');
app.set('views', './views');

// Configuring the database
const config = require('./config');
const mongoose = require('mongoose');
const redis = require('redis');
const client = redis.createClient(config.redisUrl);

// init session
app.use(session({secret: config.secret, saveUninitialized: true,resave: true}));

const user_api = require('./app/routes/api/user');
const broker_api = require('./app/routes/api/broker');
const broker = require('./app/routes/broker');
const sso = require('./app/routes/sso');

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

mongoose.set('useFindAndModify', false);

app.use('/api', user_api);
app.use('/api', broker_api);
app.use('/sso', sso);
app.use('/', broker);

app.get('/checkHealth', (req, res) => {
    res.json({"message": "connected."});
});

app.get('/', (req, res) => {
    if (req.session.user === undefined)
        return res.redirect('/sso/login');
    client.get(`user.${req.session.user}`, (err, email) => {
        return res.send(`Hello ${email}. <a href="/sso/logout">Logout.</a>`);
    });
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
