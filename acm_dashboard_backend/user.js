const express = require("express");
const cors = require("cors");
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
app.post("/fetchUserDoc/:email", function(req, res){
    const emailId = req.params.email;
    // const result = fetchUserByEmail(emailId);

    db.query('SELECT * FROM dashboardusers WHERE email = ?', [emailId], function(err, result){
      if(err){
        console.log(err);
      }else{
        res.send(result);
      }
    })
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


app.post("/login/:email", function(req, res){
// //     const emailId = req.params.email;

// //     const data = fetchUserByEmail(emailId);

// //     if(data.password == )

    const emailId = req.params.email;

    db.query(`SELECT * FROM dashboardusers WHERE email = ?`, [emailId], function(err, result){
        if(err){
            console.log(err);
        }else{
            if( result.name = "Test User" ){
                res.send({message: "Success"});
            }else{
                res.send({message: "Abbe glt username hai"});
            }
        }
    })

});

app.post("/register", function(req,res){

    db.query(`INSERT INTO dashboardusers (userId, email, password, name, branch, course, rollNo, college) VALUES ('69', 'abc@test.com', '69', 'abcdef', 'abc', 'AI-DS', '69', 'USAR' )`, function(err, result){
        if(err){
            console.log(err);
        }else{
            res.send({message: "Success"});
        }
    });
});

app.post("/update/:email", function(req,res){
    const emailId = req.params.email;

    db.query(`UPDATE dashboardusers SET college = 'University School of automation and robotics' WHERE email = ?`, [emailId], function(err, result){
        if(err){
            console.log(err);
        }else{
            res.send({message: "updated"});
        }
    })
});


app.listen("3000", function(){
    console.log("Server started on port 3000.");
})
  