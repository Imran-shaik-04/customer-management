const mysql = require("mysql2");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Admin@123",
  database: "customer_db"
});

conn.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected");
});

module.exports = conn;