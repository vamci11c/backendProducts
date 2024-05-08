// models/postModel.js

const selectBlogsQuery = "SELECT * FROM blogData";
const selectSingleBlogQuery = "SELECT * FROM blogData where blogId=?";
const insertBlogsQuery =
  "INSERT INTO blogsData.blogdata (blogId,title,bannerImage,description,content)VALUES(?,?,?,?,?)";
const updateBlogsQuery =
  "UPDATE blogdata SET title = ?, bannerImage = ?,description=?,content=?  WHERE blogId = ?";
const deleteBlogQuery = "DELETE FROM blogdata WHERE blogId = ?";

module.exports = {
  selectBlogsQuery,
  selectSingleBlogQuery,
  insertBlogsQuery,
  updateBlogsQuery,
  deleteBlogQuery,
};
