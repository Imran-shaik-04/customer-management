const express = require("express");
const session = require("express-session");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const customerRoutes = require('./routes/customers');
//const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: true
}));

app.use("/api", authRoutes);
//const customerRoutes = require('./routes/customers');
app.use('/api/customers', customerRoutes);
//app.use('/api/users', userRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));

