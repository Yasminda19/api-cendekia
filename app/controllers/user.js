const User = require("../models/user");
var hbs = require("nodemailer-express-handlebars"),
  nodemailer = require("nodemailer"),
  bcrypt = require("bcryptjs"),
  path = require("path"),
  email = process.env.MAILER_EMAIL_ID || "auth_email_address@gmail.com",
  pass = process.env.MAILER_PASSWORD || "auth_email_pass";

exports.register = async (req, res) => {
  // Create a new user
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  //Login a registered user
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.logout = async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.logoutall = async (req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

// reset / forgot password goes down here
var smtpTransport = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER || "Gmail",
  auth: {
    user: email,
    pass: pass,
  },
});

var handlebarsOptions = {
  viewEngine: "handlebars",
  viewPath: path.resolve("../templates/"),
  extName: ".html",
};

smtpTransport.use("compile", hbs(handlebarsOptions));

exports.index = function (req, res) {
  return res.sendFile(path.resolve("../../html-template/home.html"));
};

exports.render_forgot_password_template = function (req, res) {
  return res.sendFile(path.resolve("../../html-template/forgot-password.html"));
};

exports.render_reset_password_template = function (req, res) {
  return res.sendFile(path.resolve("../../html-template/reset-password.html"));
};

exports.reset_password = function (req, res, next) {
  User.findOne({
    reset_password_token: req.body.token,
    reset_password_expires: {
      $gt: Date.now(),
    },
  }).exec(function (err, user) {
    if (!err && user) {
      if (req.body.newPassword === req.body.verifyPassword) {
        user.hash_password = bcrypt.hashSync(req.body.newPassword, 10);
        user.reset_password_token = undefined;
        user.reset_password_expires = undefined;
        user.save(function (err) {
          if (err) {
            return res.status(422).send({
              message: err,
            });
          } else {
            var data = {
              to: user.email,
              from: email,
              template: "reset-password-email",
              subject: "Password Reset Confirmation",
              context: {
                name: user.name.split(" ")[0],
              },
            };

            smtpTransport.sendMail(data, function (err) {
              if (!err) {
                return res.json({ message: "Password reset" });
              } else {
                return done(err);
              }
            });
          }
        });
      } else {
        return res.status(422).send({
          message: "Passwords do not match",
        });
      }
    } else {
      return res.status(400).send({
        message: "Password reset token is invalid or has expired.",
      });
    }
  });
};

exports.forgot_password = function (req, res) {
  async.waterfall(
    [
      function (done) {
        User.findOne({
          email: req.body.email,
        }).exec(function (err, user) {
          if (user) {
            done(err, user);
          } else {
            done("User not found.");
          }
        });
      },
      function (user, done) {
        // create the random token
        crypto.randomBytes(20, function (err, buffer) {
          var token = buffer.toString("hex");
          done(err, user, token);
        });
      },
      function (user, token, done) {
        User.findByIdAndUpdate(
          { _id: user._id },
          {
            reset_password_token: token,
            reset_password_expires: Date.now() + 86400000,
          },
          { upsert: true, new: true }
        ).exec(function (err, new_user) {
          done(err, token, new_user);
        });
      },
      function (token, user, done) {
        var data = {
          to: user.email,
          from: email,
          template: "forgot-password-email",
          subject: "Password help has arrived!",
          context: {
            url: "http://localhost:3000/api/auth/reset_password?token=" + token,
            name: user.name.split(" ")[0],
          },
        };

        smtpTransport.sendMail(data, function (err) {
          if (!err) {
            return res.json({
              message: "Kindly check your email for further instructions",
            });
          } else {
            return done(err);
          }
        });
      },
    ],
    function (err) {
      return res.status(422).json({ message: err });
    }
  );
};
