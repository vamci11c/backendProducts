const express = require("express");
const {
  getCareers,
  createCareer,
  getCareerById,
  updateCareer,
  deleteCareer,
} = require("../controlller/careerController");

const router = express.Router();

router.route("/").get(getCareers);

router.route("/").post(createCareer);

router
  .route("/:id")
  .get(getCareerById)
  .patch(updateCareer)
  .delete(deleteCareer);

module.exports = router;
