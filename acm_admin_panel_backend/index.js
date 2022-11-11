require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const mysql = require("mysql");


const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//Make connection with database
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});
  
db.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("mysql connected");
    }
});



//
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
  
  