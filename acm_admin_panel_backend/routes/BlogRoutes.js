const express = require("express");
const router = express.Router();
const db = require("../database");

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

router.post("/deleteBlog", async (req, res) => {
    const blogId = req.body.id;
    var sql = `DELETE FROM blogs WHERE blogId=?`;
    db.query(sql, [blogId], function(err, result) {
        if (err) throw err;
        //console.log(result.affectedRows + " record(s) updated");
        res.send({ message: "Deleted" });
    });
});

router.post("/blog/create", async (req, res) => {

    const email = req.body.email;
    const title = req.body.title;
    const content = req.body.content;
    const Image = req.body.image;

    db.query(
        `SELECT * FROM dashboardusers WHERE email=?`,
        [email],
        function(error, result) {
            if (error) {
                console.log(error);
            } else {
                if (result[0] == null) {
                    return res.status(400).send({ message: "Invalid request this user doesn't exist" });
                } else {
                    var sql = `INSERT INTO blogs (userEmail, userName, blogTitle, coverImage, content) VALUES ( ?, ?, ?, ?, ?)`;
                    db.query(sql, [email, result[0].name, title, Image, content], function(err, result) {
                        if (err) throw err;
                        res.send({ message: "Blog Added" });
                        //console.log(req);
                    });
                }
            }
        }
    )


});


router.post("/changeStatus", async (req, res) => {
    const blogId = req.body.id
    var sql = `UPDATE blogs SET approved = 1 WHERE blogId=? `;
    db.query(sql, [blogId], function(err, result) {
        if (err) throw err;
        //console.log(result.affectedRows + " record(s) updated");
        res.send({ message: "Blog approved" });
    });
});




module.exports = router;


