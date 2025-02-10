// models/postModel.js
const getTimeSlotsQuery =
  "SELECT ts.slot_id, c.court_id, c.name AS court_name, ts.start_time, ts.end_time,   CASE WHEN DAYOFWEEK('2025-02-10') IN (1, 7) THEN ts.weekend_price  ELSE ts.weekday_price END AS price FROM time_slots ts JOIN courts c ON ts.court_id = c.court_id WHERE NOT EXISTS (SELECT 1 FROM bookings b     WHERE b.slot_id = ts.slot_id     AND b.booking_date = '2025-02-11'     AND b.status = 'booked') ORDER BY c.name, ts.start_time;";
const selectBlogsQuery =
  'SELECT blogData.blogID,blogData.categoryId,blogData.title,blogData.bannerImage,blogData.description,blogData.content,categories.category FROM blogData JOIN categories ON blogData.categoryId = categories.categoryId';
const selectBlogsByCategoryIdQuery =
  'SELECT blogData.blogID,blogData.categoryId,blogData.title,blogData.bannerImage,blogData.description,blogData.content,categories.category   FROM blogData  JOIN categories ON blogData.categoryId = categories.categoryId where blogData.categoryId=?';
const selectSingleBlogQuery = 'SELECT * FROM blogData where blogId=?';
const insertBlogsQuery =
  'INSERT INTO blogData (blogId,categoryId,title,bannerImage,description,content)VALUES(?,?,?,?,?,?)';
const updateBlogsQuery =
  'UPDATE blogData SET categoryId=?, title = ?, bannerImage = ?,description=?,content=?  WHERE blogId = ?';
const deleteBlogQuery = 'DELETE FROM blogData WHERE blogId = ?';

module.exports = {
  getTimeSlotsQuery,
  selectBlogsQuery,
  selectBlogsByCategoryIdQuery,
  selectSingleBlogQuery,
  insertBlogsQuery,
  updateBlogsQuery,
  deleteBlogQuery,
};
