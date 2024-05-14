// models/postModel.js

const selectBlogsQuery =
  "SELECT blogdata.blogID,blogdata.categoryId,blogdata.title,blogdata.bannerImage,blogdata.description,blogdata.content,categories.category FROM blogdata JOIN categories ON blogdata.categoryId = categories.categoryId";
const selectBlogsByCategoryIdQuery =
  "SELECT blogdata.blogID,blogdata.categoryId,blogdata.title,blogdata.bannerImage,blogdata.description,blogdata.content,categories.category   FROM blogdata  JOIN categories ON blogdata.categoryId = categories.categoryId where blogdata.categoryId=?";
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
