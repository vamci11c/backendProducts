const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const blogQueries = require("../queries/blogsQueries");
const connection = require("../mySqlDb");

//@desc Create  products
//@route post /api/products
//@access public

async function createProduct(req, res) {
  const { categoryId, title, bannerImage, description, content } = req.body;
  const blogId = uuidv4();

  try {
    // Execute the INSERT query with the provided data
    connection.query(
      blogQueries.insertBlogsQuery,
      [blogId, categoryId, title, bannerImage, description, content],
      (error, results) => {
        if (error) {
          console.error("Error inserting blog:", error);
          res.status(500).send("An error occurred while creating the blog.");
        } else {
          // If insertion was successful, send back the inserted blog data
          const insertedBlog = {
            blogId,
            title,
            bannerImage,
            description,
            content,
          };
          res.json(insertedBlog);
        }
      }
    );
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
  const blogId = req.params.id;
  try {
    connection.query(
      blogQueries.selectSingleBlogQuery,
      [blogId],
      (error, results) => {
        if (error) {
          console.error("Error retrieving blog:", error);
          res.status(500).send("An error occurred while retrieving the blog.");
        } else {
          res.json(results);
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

//@desc Edit individual  products
//@route PUT /api/products/id
//@access public
async function updateProduct(req, res) {
  const { categoryId, title, bannerImage, description, content } = req.body;
  const blogId = req.params.id;

  try {
    connection.query(
      blogQueries.updateBlogsQuery,
      [categoryId, title, bannerImage, description, content, blogId],
      (error, results) => {
        if (error) {
          console.error("Error updating blog:", error);
          res.status(500).send("An error occurred while updating the blog.");
        } else {
          res.send(results);
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

//@desc Delete individual  products
//@route DELETE /api/products/id
//@access public
async function deleteProduct(req, res) {
  const blogId = req.params.id;

  try {
    connection.query(
      blogQueries.deleteBlogQuery,
      [blogId],
      (error, results) => {
        if (error) {
          console.error("Error deleting blog:", error);
          res.status(500).send("An error occurred while deleting the blog.");
        } else {
          res.send(results);
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

//@desc Get blogs by category Id
//@route GET /api/blogs/categoryblogs/:id
//@access public

async function getblogsByCategory(req, res) {
  const categoryId = req.params.id;
  try {
    connection.query(
      blogQueries.selectBlogsByCategoryIdQuery,
      [categoryId],
      (error, results) => {
        if (error) {
          console.error("Error retrieving blog:", error);
          res.status(500).send("An error occurred while retrieving the blog.");
        } else {
          res.json(results);
        }
      }
    );
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
  getblogsByCategory,
};
