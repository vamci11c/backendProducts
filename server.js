const express = require("express");
const errorHandler = require("./middleWare/errorHandler");
const app = express();
const mySql = require("./mySqlDb");
// const url = 'mongodb://localhost:27017/blogsDB'
const port = process.env.port || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(express.urlencoded({ limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use("/api/blogs", require("./routes/blogsRoute"));
app.use("/api/categories", require("./routes/categoryRoute"));
app.use(errorHandler);
app.listen(port, () => {
  console.log(`I am in exprees server on port ${port}`);
});
