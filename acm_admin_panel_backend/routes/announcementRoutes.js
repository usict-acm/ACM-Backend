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

router.get("/displayAnnouncement", (req, res) => {
  db.query(`SELECT * FROM event`, function (err, results) {
    if (err) {
      console.log(err);
      res.send({ message: "Internal Server error!" });
    } else {
      res.send({ message: "Success", event: results });
    }
  });
});
router.post("/announcements/insert", async (req, res) => {
  const title = req.body.name;
  const description = req.body.description;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const button1Text = req.body.button1Text;
  const button1Link = req.body.button1Link;
  const button2Text = req.body.button2Text;
  const button2Link = req.body.button2Link;
  const partners = req.body.partners;
  const speakers = req.body.speakers;
  const poster = req.body.poster;
//   const github = req.body.github;
//   const instagram = req.body.instagram;
//   const year = req.body.year;
//   const category = req.body.category;
  var sql = `INSERT INTO event (name, description, startDate, endDate, button1Text, button1Link, button2Text, button2Link, partners, speakers, poster) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [title, description, startDate, endDate, button1Text, button1Link, button2Text, button2Link, partners, speakers, poster],
    function (err, result) {
      if (err) throw err;
      res.send("Successfully added");
      //console.log(req);
    }
  );
});
//delete and member
router.post("/announcements/delete", (req,res)=>{
  const name = req.body.name;

    db.query("DELETE FROM event WHERE name=?", 
    [req.body.name], 
    function(err, result){
        if(err){
            throw err;
        }else{
            res.send("successfully deleted an annoucement");
        }
    })
});

module.exports = router;
