const auth = require("../middleware/auth");
const post = require('../controllers/post');

module.exports = (app) => {

    // Create a new post
    app.post("/api/post", post.post);
    // app.put("/api/auth", auth.post);
}
