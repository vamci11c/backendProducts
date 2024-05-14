const selectCareersQuery = "SELECT * FROM career";
const selectSingleCareerQuery = "SELECT * FROM career where careerId=?";
const insertCareerQuery =
  "INSERT INTO career (careerId,cardImage,jobTitle,location,jobDescription)VALUES(?,?,?,?,?)";
const updateCareerQuery =
  "UPDATE career SET   cardImage = ? , jobTitle=? , location=? ,jobDescription=?  WHERE careerId = ?";
const deleteCareerQuery = "DELETE FROM career WHERE careerId = ?";

module.exports = {
  selectCareersQuery,
  selectSingleCareerQuery,
  insertCareerQuery,
  updateCareerQuery,
  deleteCareerQuery,
};
