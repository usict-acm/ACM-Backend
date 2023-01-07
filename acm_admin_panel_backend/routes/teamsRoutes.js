const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/displayTeam", (req, res) => {
    db.query(`SELECT * FROM team ORDER BY id DESC`, function(err, result) {
        if (err) {
            throw err;
        } else {
            res.json(result);
        }
    });
});
router.post("/teams/insert", async (req, res) => {
    const image = req.body.image;
    const name = req.body.name;
    const designation = req.body.designation;
    const linkedin = req.body.linkedin;
    const github = req.body.github;
    const instagram = req.body.instagram;
    const year = req.body.year;
    const category = req.body.category;
    var sql = `INSERT INTO team (image, name, designation, linkedin, github, instagram, year, category) VALUES ( ?, ?, ?, ?, ? ,? ,? ,?)`;
    db.query(
        sql,
        [image, name, designation, linkedin, github, instagram, year, category],
        function(err, result) {
            if (err) throw err;
            res.send(result);
            //console.log(req);
        }
    );
});
//delete and member
module.exports = router;
