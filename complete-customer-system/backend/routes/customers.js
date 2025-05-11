
const express = require("express");
const router = express.Router();
const db = require("../models/db");

router.post("/", (req, res) => {
  const { name, email, phone, address, pincode } = req.body;
  const query = "INSERT INTO customers (name, email, phone, address, pincode) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [name, email, phone, address, pincode], (err, result) => {
    if (err) return res.status(500).send("Error adding customer");
    res.send("Customer added");
  });
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM customers", (err, results) => {
    if (err) return res.status(500).send("Error fetching customers");
    res.json(results);
  });
});

router.put("/:id", (req, res) => {
  const { name, email, phone, address, pincode } = req.body;
  const query = "UPDATE customers SET name=?, email=?, phone=?, address=?, pincode=? WHERE id=?";
  db.query(query, [name, email, phone, address, pincode, req.params.id], (err, result) => {
    if (err) return res.status(500).send("Error updating customer");
    res.send("Customer updated");
  });
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM customers WHERE id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).send("Error deleting customer");
    res.send("Customer deleted");
  });
});

module.exports = router;
