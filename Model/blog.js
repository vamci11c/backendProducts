const mongoose = require("mongoose");

const bogSchema = new mongoose.Schema({
  blogId: String,
  title: String,
  banner: String,
  status: String,
  content: String,
});

const BlogModel = mongoose.model("ridgeBlog", bogSchema);

module.exports = BlogModel;
