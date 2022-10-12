require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

app.use(express.json());

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
    try{
    db.query('SELECT * FROM dashboardusers WHERE email = ?', [emailId], function(err, result){
      if(err){
        console.log(err);
      }else{
        res.json(result);
      }
    })
    // res.send(result);
    }catch{
        res.status(500).send("Internal server error");
    }
  
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


app.post("/login", async function(req, res){

    // try{
    //     const {email, password} = req.body;
    //     const user = db.query(`SELECT * FROM dashboardusers WHERE email = ?`, [email]);
    //     if(user){
    //         const validPassword = await bcrypt.compare(password, user.password);
    //         if(validPassword){
    //             res.status(200).json({message: "Success"});
    //         }else{
    //             res.send("Wrong password");
    //         }
    //     }else{
    //         res.send("User not found");
    //     }
    // }catch(e){
    //     console.log(e);
    //     res.status(500).send("Internal server error");
    // }

    const emailId = req.body.email;

    db.query(`SELECT * FROM dashboardusers WHERE email = ?`, [emailId], function(err, result){
        if(result == null){
            return res.status(400).send("User not found");
        }
        try{
            if(bcrypt.compare(req.body.password, result.password)){
                const user = {email: result.email};
                const accessToken = generateAccessToken(user);
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
                res.json({
                message:"Success", 
                accessToken: accessToken, 
                refreshToken: refreshToken
                });

            }else{
                res.status(500).send("Wrong password");
            }
            // bcrypt.compare(req.body.password, result.password, function(err, result){
            //     if(err){
            //         res.status(500).send([]);
            //         console.log(err);
            //     }else if(result){
            //         res.status(200).json({message: "Success"});
            //     }else{
            //         res.status(400).send("Incorrect password");
            //     }
            // });

        }catch{
            res.status(500).send("Internal Server error");
            console.log(err);
        }
    }
    )

});

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'})
}


app.post("/register", async function(req,res){
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash("abcd", salt)
        db.query(`INSERT INTO dashboardusers (userId, email, password, name, branch, course, rollNo, college) VALUES ('69', 'abc@test.com', ?, 'abcdef', 'abc', 'AI-DS', '69', 'USAR' )`,
            [hashedPassword],
            function(err, result){
                if(err){
                    console.log(err);
                }else{
                    res.status(200).json({message: "Success"});
                } 
            });
        // console.log(salt);
        // console.log(hashedPassword);
        

    }catch{
        res.status(500).send("Internal Server error"); 
    }

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
  