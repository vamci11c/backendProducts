const BlogModel = require("../Model/blog");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");

//@desc Create  products
//@route post /api/products
//@access public
async function createProduct(req, res) {
  const { title, status, content } = req.body;
  const blogId = uuidv4();
  try {
    const blogData = new BlogModel({ blogId, title, status, content });
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
    const blogs = await BlogModel.find({});
    res.send(blogs);
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
  console.log("req", req.params.id, req.body);
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
  // res.status(200).json({ message: `delete product ${req.params.id}` });
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
