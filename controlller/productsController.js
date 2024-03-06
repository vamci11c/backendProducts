const asyncHandler = require("express-async-handler");
//@desc get all products
//@route GET /api/products
//@access public
const getProducts = asyncHandler((req, res) => {
  res.status(200).json({ message: "get all products" });
});

//@desc Create  products
//@route post /api/products
//@access public
const createProduct = asyncHandler((req, res) => {
  console.log("create product body", req.body);
  const { name, age, phone } = req.body;
  if (!name || !age || !phone) {
    res.status(400);
    throw new Error("All Fields Are manditory");
  }
  res.status(200).json({ message: "create a products" });
});

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
