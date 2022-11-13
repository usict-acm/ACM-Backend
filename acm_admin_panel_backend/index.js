require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const joinUsRoutes = require("./routes/joinUsRoutes");



const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(joinUsRoutes);



//
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
  
  