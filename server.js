const express = require("express");
const errorHandler = require("./middleWare/errorHandler");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.port || 5000;

app.use(express.json())

app.use("/api/products", require("./routes/productsRoute"));

app.use("/api/user", require("./routes/userRoute"));
app.use(errorHandler)
app.listen(port, () => {
  console.log(`I am in exprees server on port ${port}`);
});
