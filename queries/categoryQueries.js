
const selectCategoriesQuery = "SELECT * FROM categories";
const selectSingleCategoryQuery = "SELECT * FROM categories where categoryId=?";
const insertCategoryQuery =
  "INSERT INTO categories (categoryId,category)VALUES(?,?)";
const updateCategoryQuery =
  "UPDATE categories SET   category = ?  WHERE categoryId = ?";
const deleteCategoryQuery = "DELETE FROM categories WHERE categoryId = ?";

module.exports = {
  selectCategoriesQuery,
  selectSingleCategoryQuery,
  insertCategoryQuery,
  updateCategoryQuery,
  deleteCategoryQuery,
};
