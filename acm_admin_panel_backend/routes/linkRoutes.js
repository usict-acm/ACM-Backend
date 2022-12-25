const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const app = express();

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

let count = 0;

router.get("/linkTable", (req, res) => {

    db.query(`SELECT * FROM  link ORDER BY id DESC`, function (err, result) {
        if (err) {
          throw err;
        } else {
          res.json(result);
        }
      });
       
});

router.post("/shorten", (req, res)=>{

  var linkDetails = req.body.details;
  var link = req.body.link;
  var route = req.body.route;

  const query = `INSERT INTO link (linkFor, originalLink, code, count) VALUES (?, ?, ?, ?)`;
  const params = [linkDetails, link, route, count];
  db.query(query, params, (error, result)=>{
    if(error){
      res.send(error);
      return;
    }
  });

  //Create new route that redirects to the url
  app.get(`/${route}`, (req,res)=>{
    res.redirect(link);
    count++;
  });
  res.send({message: "Route Created", path: route });

});

module.exports = router;
