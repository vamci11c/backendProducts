const express = require("express");
const mongoose = require('mongoose')
const errorHandler = require("./middleWare/errorHandler");
const dotenv = require("dotenv").config();
const app = express();
const db = require('./db');
const mySql = require('./mySqlDb');
// const url = 'mongodb://localhost:27017/blogsDB'
const port = process.env.port || 5000;
const cors = require('express-cors');
const bodyParser = require("body-parser");

app.use(express.json({ limit: '10mb' }))
app.use(cors())
app.use(express.urlencoded({ limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use("/api/blogs", require("./routes/blogsRoute"));
app.use("/api/user", require("./routes/userRoute"));
app.use(errorHandler)
app.listen(port, () => {
  console.log(`I am in exprees server on port ${port}`);
});
