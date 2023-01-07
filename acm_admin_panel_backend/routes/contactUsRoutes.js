const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const db = require("../database");


router.get("/contactus", (req, res) => {
    db.query(`SELECT * FROM contactus`, function(err, result) {
        if (err) {
            throw err;
        } else {
            res.json(result);
        }
    })
})


module.exports = router;
