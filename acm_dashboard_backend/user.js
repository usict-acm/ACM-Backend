require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
//Create connection
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

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
//Fetch user doc
app.post("/fetchUserDoc/:email", function (req, res) {
  const emailId = req.params.email;
  // const result = fetchUserByEmail(emailId);

  db.query(
    "SELECT * FROM dashboardusers WHERE email = ?",
    [emailId],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
  // res.send(result);
});

// function fetchUserByEmail(email){
//     db.query(`SELECT * FROM dashboardusers WHERE email = ?`, [email], (err, result) => {
//         if(err){
//             console.log(err);
//         }else{
//             return result;
//         }
//     })
// }

app.post("/login", function (req, res) {
  //const emailId = req.params.email;
  // //     const data = fetchUserByEmail(emailId);
  // //     if(data.password == )
  //const emailId = req.params.email;
  const email = req.body.email;
  const user = { id: email };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5m",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  //res.json({ accessToken: accessToken });
  db.query(
    `SELECT * FROM dashboardusers WHERE email = ?`,
    [email],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        if ((result.name = "Test User")) {
          //res.send({ message: "Success" });
          res.json({ accessToken: accessToken, refreshToken: refreshToken });
        } else {
          res.send({ message: "Abbe glt username hai" });
        }
      }
    }
  );
});

app.post("/register", function (req, res) {
  const password = "gypsy";

  bcrypt.hash(password, saltRounds, function (err, hash) {
    const hashed_password = hash;
    db.query(
      `INSERT INTO dashboardusers (userId, email, password, name, branch, course, rollNo, college) VALUES (69, "abc@test.com", ?, "aditya", "aids", "btech", 69, "USAR" )`,
      [hashed_password],
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          res.send({ message: "Success" });
        }
      }
    );
  });
});

app.post("/update/:email", function (req, res) {
  const emailId = req.params.email;

  db.query(
    `UPDATE dashboardusers SET college = 'University School of automation and robotics' WHERE email = ?`,
    [emailId],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send({ message: "updated" });
      }
    }
  );
});

app.listen("3000", function () {
  console.log("Server started on port 3000.");
});
