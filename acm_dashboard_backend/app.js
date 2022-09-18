require('dotenv').config();
const flash = require("connect-flash");
const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").strategy;
const mysql = require("mysql");

//Create connection
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : process.env.PASSWORD,
  database : 'acmbackend'
});

db.connect(function(err){
  if(err){
    console.log(err);
  }else{
    console.log("mysql connected");
  }
})

const app = express();

//Fetch user doc
app.post("/fetchUserDoc", function(req, res){
  db.query('SELECT * FROM dashboardusers', function(err, results){
    if(err){
      console.log(err);
    }else{
      res.send(results);
    }
  })
});

app.post("/blogs", function(req, res){
  db.query('SELECT * FROM blogs', function(err, results){
    if(err){
      console.log(err);
    }else{
      res.send(results);
    }
  })
});

//Select single blog by blog id
app.post("/singleBlog/:blogId", function(req, res){
  const blogId = req.params.blogId;

  if(isNaN(Number(blogId))){
    return res.status(400).json({err: "Number only, please!"})
  }

  db.query(`SELECT * FROM blogs WHERE blogId = ?`, [blogId], function(err, result){
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  });

});

//Select all events table
app.get("/allEvents", function(req, res){
    //
    // const onlyLettersPattern = /^[A-Za-z]+$/;
    //
    // if(!eventId.match(onlyLettersPattern)){
    //   return res.status(400).json({err: "No special character and numbers please! "});
    // }

  const sql = 'SELECT * FROM event';
  const query = db.query(sql, function(err, results){
    if (err){
      console.log(err);
    }else{
      res.send(results);
    }
  });
});

//Select from table by userId/sno
app.post("/singleEvent/:eventId", function(req, res){
  const eventId = req.params.eventId;

  if(isNaN(Number(eventId))){
    return res.status(400).json({err: "Number only, please!"})
  }

  const sql = `SELECT * FROM event WHERE sno = ?`;
  const query = db.query(sql, [eventId], function(err, result){
    if (err){
      console.log(err);
    }else{
      res.send(result);
    }
  });
});


app.listen("3000", function(){
  console.log("Server started on port 3000.");
})
