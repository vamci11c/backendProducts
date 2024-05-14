const express = require("express");
const {
  getcategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controlller/categoriesController");

const router = express.Router();

router.route("/").get(getcategories);

router.route("/").post(createCategory);

router
  .route("/:id")
  .get(getCategoryById)
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = router;
