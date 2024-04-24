const BlogModel = require('../Model/blog');

const asyncHandler = require("express-async-handler");

//@desc Create  products
//@route post /api/products
//@access public
async function createProduct(req, res) {
  console.log("create product body", req.body);
  const { name, age } = req.body;

  try {
    const blogData = new BlogModel({ name, age });
    await blogData.save();
    res.send(blogData);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

//@desc get all products
//@route GET /api/products
//@access public
async function getProducts(req, res) {
  try {
    const users = await BlogModel.find({});
    console.log('users', users)
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};



//@desc Get individual  products
//@route GET /api/products/id
//@access public
const getProduct = asyncHandler((req, res) => {
  res.status(200).json({ message: `get product ${req.params.id}` });
});

//@desc Edit individual  products
//@route PUT /api/products/id
//@access public
const updateProduct = asyncHandler((req, res) => {
  res.status(200).json({ message: `update product ${req.params.id}` });
});

//@desc Delete individual  products
//@route DELETE /api/products/id
//@access public
const deleteProduct = asyncHandler((req, res) => {
  res.status(200).json({ message: `delete product ${req.params.id}` });
});

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
