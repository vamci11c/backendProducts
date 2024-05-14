// models/postModel.js

const selectBlogsQuery = "SELECT * FROM blogData";
const selectSingleBlogQuery = "SELECT * FROM blogData where blogId=?";
const insertBlogsQuery =
  "INSERT INTO blogData (blogId,title,bannerImage,description,content)VALUES(?,?,?,?,?)";
const updateBlogsQuery =
  "UPDATE blogData SET categoriId=?, title = ?, bannerImage = ?,description=?,content=?  WHERE blogId = ?";
const deleteBlogQuery = "DELETE FROM blogData WHERE blogId = ?";

module.exports = {
  selectBlogsQuery,
  selectSingleBlogQuery,
  insertBlogsQuery,
  updateBlogsQuery,
  deleteBlogQuery,
};
