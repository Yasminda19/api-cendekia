const auth = require("../middleware/auth");
const user = require("../controllers/user");

module.exports = (app) => {
  app.post("/api/auth/register", user.register);
  app.put("/api/auth", user.register); // alias?

  app.post("/api/auth/login", user.login);
  app.post("/api/auth/logout", auth, user.logout);
  app.post("/api/auth/logoutall", auth, user.logoutall);

  app.get("/api/auth", auth, async (req, res) => {
    // View logged in user profile
    res.send(req.user);
  });

  // app
  //   .route("/api/auth/forgot_password")
  //   .get(user.render_forgot_password_template)
  //   .post(user.forgot_password);

  // app
  //   .route("/api/auth/reset_password")
  //   .get(user.render_reset_password_template)
  //   .post(user.reset_password);
};
