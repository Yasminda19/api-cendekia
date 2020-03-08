var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../users/user');
var VerifyToken = require('./VerifyToken');

// add module for JSON web tokens
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/database.config.js');

//register endpoint
router.post('/register', function(req, res) {

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword
  },
  function (err, user) {
    if (err)
    return
    User.findById(decoded.id,
  { password: 0 }, // projection
  function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    res.status(200).send(user);
});
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 60*60*24*2 // expires in 48 hours, that's 2 days for you who doesnt add things up
    });
    res.status(200).send({ auth: true, token: token });
  });
});

//login endpoint
router.post('/login', function(req, res) {

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  });

});

//logout endpoint
router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

//verify tokens
router.get('/me', VerifyToken, function(req, res, next) {

  User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    res.status(200).send(user);
  });

module.exports = router;
