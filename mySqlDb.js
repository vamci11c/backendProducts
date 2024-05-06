const mysql = require("mysql2");

// const connectionString = "mysql://root:admin@localhost:3306/blogsdata";
// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306, // specify the port separately
  user: "root",
  password: "admin",
  database: "blogsdata",
  insecureAuth: true,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database as id " + connection.threadId);
});

// // Perform database operations here...

// // Close the connection when finished
// connection.end((err) => {
//   if (err) {
//     console.error("Error closing MySQL connection: " + err.stack);
//     return;
//   }
//   console.log("MySQL connection closed.");
// });

module.exports = connection;

// const pool = mysql.createPool({
//   host: 'localhost',
//   port: 3306, // specify the port separately
//   user: 'root',
//   password: 'admin',
//   database: 'blogsdata',
//   connectionLimit: 10
// });

// module.exports = pool.promise();
