require("dotenv").config();
// const flash = require("connect-flash");
const express = require("express");
const router = express.Router();
const cors = require("cors");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").strategy;
const mysql = require("mysql");

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

//Select all events table
router.get("/allEvents", function (req, res) {
  db.query(`SELECT * FROM event`, function (err, results) {
    if (err) {
      console.log(err);
      res.send({ message: "Internal Server error!" });
    } else {
      res.send({ message: "Success", event: results });
    }
  });
});

//Select from table by userId/sno
router.post("/singleEvent", function (req, res) {
  const eventId = req.body.eventId;

  if (isNaN(Number(eventId))) {
    return res.status(400).json({ err: "Number only, please!" });
  }

  const sql = `SELECT * FROM event WHERE sno = ?`;
  const query = db.query(sql, [eventId], function (err, result) {
    if (err) {
      console.log(err);
      res.send({ message: "Internal server error!" });
    } else {
      res.send({ message: "Success", event: result });
    }
  });
});

router.post("/checkRegisteredStudents", function (req, res) {
  const eventId = req.body.eventId;
  const userId = req.body.userId;

  if (isNaN(Number(eventId))) {
    return res.status(400).json({ err: "Number only, please!" });
  } else if (isNaN(Number(userId))) {
    return res.status(400).json({ err: "Number only please!" });
  }

  let sql = `SELECT * FROM dashboard_event_participant WHERE eventId= ? AND userId= ? `;
  let query = db.query(sql, [eventId, userId], function (err, result) {
    if (err) {
      res.send({ message: "Internal server error!" });
    } else {
      res.send({ message: "Success" });
    }
  });
});

router.post("/postDetailDashboard", function (req, res) {
  if (isNaN(Number(req.body.eventId))) {
    return res.status(400).json({ err: "Number only, please!" });
  } else if (isNaN(Number(req.body.userId))) {
    return res.status(400).json({ err: "Number only, please!" });
  }

  let sql = `INSERT INTO dashboard_event_participant (eventId, userId) VALUES (?)`;
  let values = [req.body.eventId, req.body.userId];
  let query = db.query(sql, [values], function (err, result) {
    if (err) {
      console.log(err);
      res.send({ message: "Internal server error!" });
    } else {
      res.send({ message: "Success" });
    }
  });
});

// app.listen("3000", function () {
//   console.log("Server started on port 3000.");
// });
module.exports = router;
