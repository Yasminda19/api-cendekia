const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    post_id: {
        type: String,
        required: true,  
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    },
    content: {
        type: String,
        required: true,
    }

});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;