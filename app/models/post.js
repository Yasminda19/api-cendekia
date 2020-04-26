const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
});
{
  timestamps: true;
}
PostSchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Post", PostSchema);
