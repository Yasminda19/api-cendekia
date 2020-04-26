module.exports = (app) => {
  const post = require("../controllers/post");
  const auth = require("../middleware/auth");

  //Membuat /create new Post
  app.post("/api/auth/post", auth, post.create);

  //Mengambil semua data /retieve all post
  app.get("/api/auth/post", auth, post.findAll);

  //Mengambil satu data post denga postId
  app.get("/api/auth/post/:postId", auth, post.findOne);

  //Mengupdate post dengan postId
  app.put("/api/auth/post/:postId", auth, post.update);

  //Delete sebuah post dengan postId
  app.delete("/api/auth/post/:postId", auth, post.delete);
};
