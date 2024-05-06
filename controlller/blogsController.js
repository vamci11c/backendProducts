const BlogModel = require("../Model/blog");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const blogQueries = require("../queries/blogsQueries");
const connection = require("../mySqlDb");

//@desc Create  products
//@route post /api/products
//@access public
async function createProduct(req, res) {
  const { title, banner, status, content } = req.body;
  const blogId = uuidv4();
  try {
    const blogData = new BlogModel({ blogId, title, banner, status, content });
    await blogData.save();
    res.send(blogData);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

//@desc get all products
//@route GET /api/products
//@access public
async function getProducts(req, res) {
  try {
    connection.query(blogQueries.selectBlogsQuery, (error, results) => {
      if (error) {
        console.error("Error retrieving user details:", error);
        res
          .status(500)
          .send("An error occurred while retrieving user details.");
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

//@desc Get individual  products
//@route GET /api/products/id
//@access public
async function getProduct(req, res) {
  try {
    const blogsById = await BlogModel.find({ blogId: req.params.id });
    res.send(blogsById);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

//@desc Edit individual  products
//@route PUT /api/products/id
//@access public
async function updateProduct(req, res) {
  try {
    const updateBlog = await BlogModel.updateOne(
      { blogId: req.params.id },
      req.body
    );
    res.send(updateBlog);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

//@desc Delete individual  products
//@route DELETE /api/products/id
//@access public
async function deleteProduct(req, res) {
  try {
    const deleteBlog = await BlogModel.deleteOne({ blogId: req.params.id });
    res.send(deleteBlog);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
