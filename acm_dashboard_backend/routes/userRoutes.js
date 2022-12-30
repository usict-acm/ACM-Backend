require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
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

// app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//Fetch user doc
router.post("/fetchUserDoc", function (req, res) {
  const emailId = req.body.email;
  db.query(
    `SELECT * FROM dashboardusers WHERE email = ?`,
    [emailId],
    function (err, result) {
      if (result[0] == null) {
        return res.status(400).send({ message: "User doesn't exist" });
      } else {
        try {
          db.query(
            "SELECT * FROM dashboardusers WHERE email = ?",
            [emailId],
            function (err, result) {
              if (err) {
                console.log(err);
              } else {
                res.json(result);
              }
            }
          );
          // res.send(result);
        } catch {
          res.status(500).send("Internal server error");
        }
      }
    }
  );
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

router.post("/login", async function (req, res) {
  const emailId = req.body.email;
  const password = req.body.password;

  db.query(
    `SELECT * FROM dashboardusers WHERE email = ?`,
    [emailId],
    function (err, result) {
      if (result[0] != null) {
        try {
          bcrypt.compare(password, result[0].password, (err, resu) => {
            if (resu === true) {
              const user = { email: result.email };
              const accessToken = generateAccessToken(user);
              const refreshToken = jwt.sign(
                user,
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: "2s" }
              );
              const userVer = jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET
              );
              console.log(userVer);
              res.json({
                message: "Success",
                accessToken: accessToken,
                refreshToken: refreshToken,
              });
              console.log(resu);
            } else {
              console.log(req.body);
              console.log(err);
              res.status(400).json({ message: "false password" });
            }
          });
        } catch {
          res.status(500).send("Internal Server error");
          console.log(err);
        }
      } else {
        console.log(result);
        return res.status(400).send({ message: "User doesn't exist" });
      }
    }
  );
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
}

router.post("/register", async function (req, res) {
  try {
    const id = req.body.id;
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const branch = req.body.branch;
    const course = req.body.course;
    const roll = req.body.roll;
    const college = req.body.college;
    const acmMemberId = req.body.memberId;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    db.query(
      `INSERT INTO dashboardusers (userId, email, password, name, acmMemberId, branch, course, rollNo, college) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? )`,
      [
        id,
        email,
        hashedPassword,
        name,
        acmMemberId,
        branch,
        course,
        roll,
        college,
      ],
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({ message: "Success" });
        }
      }
    );
    // console.log(salt);
    // console.log(hashedPassword);
  } catch {
    res.status(500).send("Internal Server error");
  }
});

// router.post("/update", function (req, res) {
//   const emailId = req.body.email;
//   // what to update?

//   db.query(
//     `UPDATE dashboardusers SET college = 'University School of automation and robotics' WHERE email = ?`,
//     [emailId],
//     function (err, result) {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send({ message: "updated" });
//       }
//     }
//   );
// });
router.post("/update", function (req, res) {
  const emailId = req.body.email;
  const name = req.body.name;
  const acmId = req.body.acmId;
  const profilePhoto = req.body.photo;
  const updateCollege = req.body.college;
  db.query(
    `SELECT * FROM dashboardusers WHERE email = ?`,
    [emailId],
    function (err, result) {
      if (result[0] == null) {
        return res.status(400).send({ message: "User doesn't exist" });
      } else {
        try {
          profilePhoto === null
            ? db.query(
                `UPDATE dashboardusers
          SET name =?, acmMemberId = ?, college = ?
          WHERE email = ?`,
                [name, acmId, updateCollege, emailId],
                function (err, result) {
                  if (err) {
                    console.log(err);
                  } else {
                    res.send({ message: "updated" });
                  }
                }
              )
            : db.query(
                `UPDATE dashboardusers
          SET name =?, acmMemberId = ?, college = ?, profilePhoto=?
          WHERE email = ?`,
                [name, acmId, updateCollege, profilePhoto, emailId],
                function (err, result) {
                  if (err) {
                    console.log(err);
                  } else {
                    res.send({ message: "updated" });
                  }
                }
              );
        } catch {
          res.send("internal server error");
        }
      }
    }
  );
});
router.post("/forgotpassword", (req, res) => {
  const emailId = req.body.email;
  try {
    db.query(
      `SELECT * FROM dashboardusers WHERE email = ?`,
      [emailId],
      function (err, result) {
        if (err) {
          console.log(err);
          // return res.status(400).send("User not found");
        } else {
          const secret = process.env.ACCESS_TOKEN_SECRET + result[0].password;
          const payload = { email: result[0].email, id: result[0].userId };
          const token = jwt.sign(payload, secret, { expiresIn: "15m" });
          const link = `http://localhost:3000/resetpassword/${result[0].userId}/${token}`;
          // console.log(result);
          console.log(link);
          res.send({ message: "resent link sent", url: link });
        }
      }
    );
  } catch {
    res.status(500).send("Internal Server error");
  }
});
router.get("/resetpassword/:id/:token", (req, res) => {
  const { id, token } = req.params;
  // console.log("id is ", id);
  try {
    db.query(
      `SELECT * FROM dashboardusers WHERE userId = ?`,
      [id],
      function (err, result) {
        // console.log(result[0].userId);
        if (id == result[0].userId) {
          const secret = process.env.ACCESS_TOKEN_SECRET + result[0].password;
          const payload = jwt.verify(token, secret);
          res.send(result[0].email);
        } else {
          res.send("Invalid id..");
        }
      }
    );
  } catch {
    res.status(500).send("Internal Server error");
  }
});
router.post("/resetpassword/:id/:token", (req, res) => {
  const { id, token } = req.params;
  const email = req.body.email;
  const password = req.body.password;
  // const confirmpassword = req.body.confirmpassword;
  try {
    db.query(
      `SELECT * FROM dashboardusers WHERE userId = ?`,
      [id],
      async function (err, result) {
        if (id == result[0].userId) {
          const secret = process.env.ACCESS_TOKEN_SECRET + result[0].password;
          const payload = jwt.verify(token, secret);
          const salt = await bcrypt.genSalt();
          const hashedPassword = await bcrypt.hash(password, salt);
          console.log(hashedPassword);
          db.query(
            `UPDATE dashboardusers
          SET password=?
          WHERE email = ?`,
            [hashedPassword, email],
            function (err, result) {
              if (err) {
                console.log(err);
              } else {
                res.send({ message: "updated" });
                // res.send(result[0].password);
              }
            }
          );
          // result[0].password = password;
          // res.send(result);
        } else {
          res.send("Invalid id..");
        }
      }
    );
  } catch {
    res.status(500).send("Internal Server error");
  }
});
module.exports = router;
