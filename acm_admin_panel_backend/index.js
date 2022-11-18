require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const joinUsRoutes = require("./routes/joinUsRoutes");
const contactUsRoutes = require("./routes/contactUsRoutes");
const teamRoutes = require("./routes/teamsRoutes");

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(joinUsRoutes);
app.use(contactUsRoutes);
app.use(teamRoutes);

//
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
