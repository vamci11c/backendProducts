const express = require("express");
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controlller/blogsController");

const router = express.Router();

router.route("/getBlogs").get(getProducts);

router.route("/createBlog").post(createProduct);

router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
