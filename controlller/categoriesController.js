const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const categoryQueries = require("../queries/categoryQueries");
const connection = require("../mySqlDb");

//@desc Create  products
//@route post /api/products
//@access public

async function createCategory(req, res) {
  const { category } = req.body;
  const blogId = uuidv4();

  try {
    // Execute the INSERT query with the provided data
    connection.query(
      categoryQueries.insertCategoryQuery,
      [category],
      (error, results) => {
        if (error) {
          console.error("Error inserting Category:", error);
          res
            .status(500)
            .send("An error occurred while creating the Category.");
        } else {
          // If insertion was successful, send back the inserted blog data
          const insertedCategory = {
            categoryId,
            category,
          };
          res.json(insertedCategory);
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
async function getcategories(req, res) {
  try {
    connection.query(
      categoryQueries.selectCategoriesQuery,
      (error, results) => {
        if (error) {
          console.error("Error retrieving Categories List:", error);
          res
            .status(500)
            .send("An error occurred while retrieving Categories list.");
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

//@desc Get individual  products
//@route GET /api/products/id
//@access public

async function getCategoryById(req, res) {
  const categoryId = req.params.id;
  try {
    connection.query(
      categoryQueries.selectSingleCategoryQuery,
      [blogId],
      (error, results) => {
        if (error) {
          console.error("Error retrieving Category:", error);
          res
            .status(500)
            .send("An error occurred while retrieving the Category.");
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
async function updateCategory(req, res) {
  const { category } = req.body;
  const categoryId = req.params.id;

  try {
    connection.query(
      categoryQueries.updateCategoryQuery,
      [category, categoryId],
      (error, results) => {
        if (error) {
          console.error("Error updating Category:", error);
          res
            .status(500)
            .send("An error occurred while updating the Category.");
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
async function deleteCategory(req, res) {
  const categoryId = req.params.id;

  try {
    connection.query(
      categoryQueries.deleteCategoryQuery,
      [categoryId],
      (error, results) => {
        if (error) {
          console.error("Error deleting Category:", error);
          res
            .status(500)
            .send("An error occurred while deleting the Category.");
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

module.exports = {
  getcategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
