const db = require("../models/db");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).send("DB Error");
    if (results.length === 0) return res.status(401).send("User not found");

    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (match) {
        req.session.user = user;
        res.send("Login success");
      } else {
        res.status(401).send("Invalid password");
      }
    });
  });
};