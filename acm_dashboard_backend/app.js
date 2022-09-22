require('dotenv').config();
const flash = require("connect-flash");
const express = require("express");
const cors = require("cors");
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
});


const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true
  })
)

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

// // //Create blogs
// // app.post("./createBlog", function(req,res) {
// //   const post = {title:"" ,body:""};
// //   const sql = `INSERT INTO blogs SET ?`;
// //   const query = db.query(sql, post, function(err, result){
// //     if(err){
// //       console.log(err);
// //     }else{
// //       res.send("1 post added");
// //     }
// //   })
// // });
//
// app.post("/blogs", function(req, res){
//   db.query('SELECT * FROM blogs', function(err, results){
//     if(err){
//       console.log(err);
//     }else{
//       res.send(results);
//     }
//   })
// });
//
// //Select single blog by blog id
// app.post("/singleBlog/:blogId", function(req, res){
//   const blogId = req.params.blogId;
//
//   if(isNaN(Number(blogId))){
//     return res.status(400).json({err: "Number only, please!"})
//   }
//
//   db.query(`SELECT * FROM blogs WHERE blogId = ?`, [blogId], function(err, result){
//     if(err){
//       console.log(err);
//     }else{
//       res.send(result);
//     }
//   });
//
// });

//Select all events table
app.get("/allEvents", function(req, res){

  const query = db.query(`SELECT * FROM event`, function(err, results){
    if (err){
      console.log(err);
      res.send({message:"Internal Server error!"})
    }else{
      res.send({message:"Success", event:results});
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
      res.send({message: "Internal server error!"})
    }else{
      res.send({message: "Success", event: result});
    }
  });

});

app.post("/checkRegisteredStudents/:eventId/:userId", function(req, res){
  const eventId = req.params.eventId;
  const userId = req.params.userId;


  if(isNaN(Number(eventId))){
    return res.status(400).json({err: "Number only, please!"});
  }else if(isNaN(Number(userId))){
    return res.status(400).json({err: "Number only please!"});
  }

  let sql = `SELECT * FROM dashboard_event_participant WHERE eventId= ? AND userId= ? `;
  let query = db.query(sql, [eventId, userId], function(err, result){
    if (err) {
      res.send({message: "Internal server error!"})
    }else{
      res.send({message: "Success"});
    }
  });

});

app.post("/postDetailDashboard/:eventId/:userId", function(req, res){

  if (isNaN(Number(req.params.eventId))){
    return res.status(400).json({err: "Number only, please!"});
  }else if (isNaN(Number(req.params.userId))){
    return res.status(400).json({err: "Number only, please!"});
  }

  let sql = `INSERT INTO dashboard_event_participant (id, eventId, userId) VALUES (?)`
  let values = [7, req.params.eventId, req.params.userId];
  let query = db.query(sql, [values], function(err, result){
    if(err){
      console.log(err);
      res.send({message: "Internal server error!"})
    }else{
      res.send({message: "Success"});
    }
  })


});


app.listen("3000", function(){
  console.log("Server started on port 3000.");
})
