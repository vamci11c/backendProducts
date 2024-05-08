const mongoose = require("mongoose");

const bogSchema = new mongoose.Schema({
  blogId: String,
  title: String,
  bannerImage: String,
  description: String,
  content: String,
});

const BlogModel = mongoose.model("ridgeBlog", bogSchema);

module.exports = BlogModel;
