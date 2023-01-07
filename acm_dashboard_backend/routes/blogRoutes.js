const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD,
    database: "acmbackend",
});

db.connect(function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("mysql connected");
    }
});

router.post("/blog/create", async (req, res) => {
    const email = req.body.email;
    const title = req.body.title;
    const content = req.body.content;

    db.query(
        `SELECT * FROM dashboardusers WHERE email=?`,
        [email],
        function(error, result) {
            if (error) {
                console.log(error);
            } else {
                if (result[0] == null) {
                    return res
                        .status(400)
                        .send({ message: "Invalid request this user doesn't exist" });
                } else {
                    var sql = `INSERT INTO blogs (userEmail, userName, blogTitle, content) VALUES ( ?, ?, ?, ?)`;
                    db.query(
                        sql,
                        [email, result[0].name, title, content],
                        function(err, result) {
                            if (err) throw err;
                            res.send(result);
                            //console.log(req);
                        }
                    );
                }
            }
        }
    );
});

router.get("/blogs", async (req, res) => {
    db.query("SELECT * FROM blogs", function(err, result, fields) {
        if (err) throw err;
        //console.log(result);
        res.send(result);
    });
});
router.post("/singleBlog", function(req, res) {
    const blogId = req.body.blogId;

    if (isNaN(Number(blogId))) {
        return res.status(400).json({ err: "Number only, please!" });
    }

    db.query(
        `SELECT * FROM blogs WHERE blogId = ?`,
        [blogId],
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

router.post("/updateBlog", async (req, res) => {
    const title = req.body.title;
    const email = req.body.email;
    var sql = `UPDATE blogs SET blogTitle = ? WHERE userEmail = ?`;
    db.query(sql, [title, email], function(err, result) {
        if (err) throw err;
        //console.log(result.affectedRows + " record(s) updated");
        res.send(result);
    });
});

module.exports = router;
