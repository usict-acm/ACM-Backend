const express = require("express");
const bodyparser = require("body-parser");
// const eventRoutes = require('./routes/eventRoutes');
const blogRoutes = require("./routes/blogRoutes");
const eventRoutes = require("./routes/eventRoutes");
// const userRoutes = require('./routes/userRoutes');
const mysql = require("mysql");

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(eventRoutes);
app.use(blogRoutes);

// app.use(userRoutes);
app.use(express.json());
//function blogInit (){}
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: "acmbackend",
});

db.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("mysql connected");
  }
});

app.get("/", (req, res) => {
  // res.send(`Your email: ${req.user.email}`);
  res.send("Hello");
});

app.listen(3000, () => {
  console.log("listning on port 3000");
});