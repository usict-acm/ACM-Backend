const express = require("express");
const router = express.Router();
const db = require("../database");


router.get("/joinus", (req, res) => {
    db.query(`SELECT * FROM join_us ORDER BY  id  DESC `, function(err, result) {
        if (err) {
            throw err;
        } else {
            res.json(result);
        }
    })
})


module.exports = router;
