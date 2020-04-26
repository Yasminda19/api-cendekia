const Post = require("../models/post");

// Membuat fungsi buat dan save post baru
exports.create = (req, res) => {
  // Validate request
  userId = req.user._id;
  if (!req.body.content) {
    return res.status(400).send({
      message: "Post content tidak boleh kosong",
    });
  }

  //membuat sebuah post
  const post = new Post({
    title: req.body.title || "Untitled Post",
    content: req.body.content,
    createdBy: userId,
  });

  post
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Terjadi error ketika membuat Post",
      });
    });
};

// Retrieve / mengembalikan semua post dari database

exports.findAll = (req, res) => {
  Post.find()
    .then((post) => {
      res.send(post);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Terjadi error ketika mencoba retrieve post",
      });
    });
};

// Mencari sebuah Post dengan PostId
exports.findOne = (req, res) => {
  Post.findById(req.params.postId)
    .then((post) => {
      if (!post) {
        return res.status(404).send({
          message: "Post dengan id " + req.params.postId + " tidak ditemukan",
        });
      }
      res.send(post);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Post dengan id " + req.params.postId + " tidak ditemukan",
        });
      }
      return res.status(500).send({
        message: "Error retriving post dengan id " + req.params.postId,
      });
    });
};

// Update sebuah post dari PostID
exports.update = (req, res) => {
  //Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Isi post tidak boleh kosong",
    });
  }
  // Cari post dan update dengan request body
  Post.findByIdAndUpdate(
    req.params.postId,
    {
      title: req.body.title || "Untitled Post",
      content: req.body.content,
    },
    { new: true }
  )
    .then((post) => {
      if (!post) {
        return res.status(404).send({
          message: "Post dengan id " + req.params.postId + " tidak ditemukan",
        });
      }
      res.send(post);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Post tidak ditemukan dengan id " + req.params.postId,
        });
      }
      return res.status(500).send({
        message: "Error ketika updating post dengan id " + req.params.postId,
      });
    });
};

// Delete sebuah  Post dengan postID
exports.delete = (req, res) => {
  Post.findByIdAndRemove(req.params.postId)
    .then((post) => {
      if (!post) {
        return res.status(404).send({
          message: "Post dengan id " + req.params.postId + " tidak ditemukan",
        });
      }
      res.send({ message: "Post telah success terhapus!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Post dengan id " + req.params.postId + " tidak ditemukan",
        });
      }
      return res.status(500).send({
        messsage: "Tidak bisa mendelete post dengan id " + req.params.postId,
      });
    });
};

exports.findAllByUserId = (req, res) => {
  Post.findById(req.user._id)
    .then((post) => {
      if (!post) {
        return res.status(404).send({
          message: "User dengan id " + req.user._id + " tidak ditemukan",
        });
      }
      res.send(post);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User dengan id " + req.user._id + " tidak ditemukan",
        });
      }
      return res.status(500).send({
        message: "Error retriving user dengan id " + req.user._id,
      });
    });
};
