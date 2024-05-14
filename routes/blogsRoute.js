const express = require("express");
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getblogsByCategory,
} = require("../controlller/blogsController");

const router = express.Router();

router.route("/").get(getProducts);

router.route("/").post(createProduct);

router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);
router.route("/categoryblogs/:id").get(getblogsByCategory);

module.exports = router;
