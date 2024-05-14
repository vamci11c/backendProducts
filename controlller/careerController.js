const { v4: uuidv4 } = require("uuid");
const careerQueries = require("../queries/careerQueries");
const connection = require("../mySqlDb");

//@desc Create  career
//@route post /api/career
//@access public

async function createCareer(req, res) {
  const { cardImage, jobTitle, location, jobDescription } = req.body;
  const careerId = uuidv4();

  try {
    // Execute the INSERT query with the provided data
    connection.query(
      careerQueries.insertCareerQuery,
      [careerId, cardImage, jobTitle, location, jobDescription],
      (error, results) => {
        if (error) {
          console.error("Error inserting Career:", error);
          res.status(500).send("An error occurred while creating the Career.");
        } else {
          // If insertion was successful, send back the inserted blog data
          const insertedCareer = {
            careerId,
            cardImage,
            jobTitle,
            location,
            jobDescription,
          };
          res.json(insertedCareer);
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

//@desc get all career
//@route GET /api/career
//@access public
async function getCareers(req, res) {
  try {
    connection.query(careerQueries.selectCareersQuery, (error, results) => {
      if (error) {
        console.error("Error retrieving career List:", error);
        res.status(500).send("An error occurred while retrieving career list.");
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

//@desc Get individual  career
//@route GET /api/career/id
//@access public

async function getCareerById(req, res) {
  const careerId = req.params.id;
  try {
    connection.query(
      careerQueries.selectSingleCareerQuery,
      [careerId],
      (error, results) => {
        if (error) {
          console.error("Error retrieving career:", error);
          res
            .status(500)
            .send("An error occurred while retrieving the career.");
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

//@desc Edit individual  career
//@route PUT /api/career/id
//@access public
async function updateCareer(req, res) {
  const { cardImage, jobTitle, location, JobDescription } = req.body;
  const careerId = req.params.id;

  try {
    connection.query(
      categoryQueries.updateCareerQuery,
      [cardImage, jobTitle, location, JobDescription, careerId],
      (error, results) => {
        if (error) {
          console.error("Error updating Career:", error);
          res.status(500).send("An error occurred while updating the Career.");
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

//@desc Delete individual  career
//@route DELETE /api/career/id
//@access public
async function deleteCareer(req, res) {
  const careerId = req.params.id;

  try {
    connection.query(
      categoryQueries.deleteCareerQuery,
      [careerId],
      (error, results) => {
        if (error) {
          console.error("Error deleting career:", error);
          res.status(500).send("An error occurred while deleting the career.");
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
  getCareers,
  createCareer,
  getCareerById,
  updateCareer,
  deleteCareer,
};
