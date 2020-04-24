module.exports = (app) => {
    const post = require ("../controllers/post");

//Membuat /create new Post
app.post("/api/post", post.create);

//Mengambil semua data /retieve all post
app.get("/api/post", post.findAll);

//Mengambil satu data post denga postId
app.get("/api/post/:postId", post.findOne);

//Mengupdate post dengan postId
app.put("/api/post/:postId", post.update);

//Delete sebuah post dengan postId
app.delete("/api/post/:postId", post.delete);

}
