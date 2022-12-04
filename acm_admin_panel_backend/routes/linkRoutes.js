const express = require("express");
const router = express.Router();
const mysql = require("mysql");

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

router.get("/link", (req, res) => {

    const link = req.body.link;
    const param = req.body.param;

    db.query(`SELECT * FROM  link`, function (err, result) {
        if (err) {
          throw err;
        } else {
          res.json(result);
        }
      });
});

module.exports = router;
