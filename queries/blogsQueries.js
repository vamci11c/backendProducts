// models/postModel.js

const selectBlogsQuery =
  "SELECT blogData.blogID,blogData.categoryId,blogData.title,blogData.bannerImage,blogData.description,blogData.content,categories.category FROM blogData JOIN categories ON blogData.categoryId = categories.categoryId";
const selectBlogsByCategoryIdQuery =
  "SELECT blogData.blogID,blogData.categoryId,blogData.title,blogData.bannerImage,blogData.description,blogData.content,categories.category   FROM blogData  JOIN categories ON blogData.categoryId = categories.categoryId where blogData.categoryId=?";
const selectSingleBlogQuery = "SELECT * FROM blogData where blogId=?";
const insertBlogsQuery =
  "INSERT INTO blogData (blogId,categoryId,title,bannerImage,description,content)VALUES(?,?,?,?,?,?)";
const updateBlogsQuery =
  "UPDATE blogData SET categoryId=?, title = ?, bannerImage = ?,description=?,content=?  WHERE blogId = ?";
const deleteBlogQuery = "DELETE FROM blogData WHERE blogId = ?";

module.exports = {
  selectBlogsQuery,
  selectBlogsByCategoryIdQuery,
  selectSingleBlogQuery,
  insertBlogsQuery,
  updateBlogsQuery,
  deleteBlogQuery,
};
