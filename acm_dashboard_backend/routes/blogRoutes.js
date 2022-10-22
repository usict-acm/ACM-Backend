const express = require("express");
const router = express.Router();
const mysql = require("mysql");

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

router.post("/blog/create", async (req, res) =>
  db.query("SELECT * FROM blogs", function (err, results) {
    if (!err) {
      var sql =
        "INSERT INTO blogs (userEmail, userName, blogTitle, content) VALUES ( 'gauranshi03@gmail.com', 'gauranshi', 'Blog1','this is first blog')";
      db.query(sql, function (err, result) {
        if (err) throw err;
        //console.log("1 record inserted");
        res.send(result);
      });
    } else {
      //console.log(err);
      console.log("Cannot post " + " /createBlog");
    }
  })
);
router.get("/blogs", async (req, res) => {
  db.query("SELECT * FROM blogs", function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
    res.send(result);
  });
});
router.post("/singleBlog", function (req, res) {
  const blogId = req.body.blogId;

  if (isNaN(Number(blogId))) {
    return res.status(400).json({ err: "Number only, please!" });
  }

  db.query(
    `SELECT * FROM blogs WHERE blogId = ?`,
    [blogId],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.post("/updateBlog", async (req, res) => {
  var sql =
    `UPDATE blogs SET blogTitle = 'Updated' WHERE userEmail = 'adi@email.com'`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    //console.log(result.affectedRows + " record(s) updated");
    res.send(result);
  });
});

module.exports = router;
