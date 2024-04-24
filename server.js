const express = require("express");
const mongoose = require('mongoose')
const errorHandler = require("./middleWare/errorHandler");
const dotenv = require("dotenv").config();
const app = express();
const db = require('./db');
// const url = 'mongodb://localhost:27017/blogsDB'
const port = process.env.port || 5000;
const cors = require('express-cors')

app.use(express.json())
app.use(cors())
app.use("/api/products", require("./routes/productsRoute"));

app.use("/api/user", require("./routes/userRoute"));
app.use(errorHandler)
app.listen(port, () => {
  console.log(`I am in exprees server on port ${port}`);
});
