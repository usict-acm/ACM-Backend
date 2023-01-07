const express = require("express");
const router = express.Router();
const app = express();
const db = require("../database");

let count = 0;

router.get("/linkTable", (req, res) => {
    db.query(`SELECT * FROM  link ORDER BY id DESC`, function(err, result) {
        if (err) {
            throw err;
        } else {
            res.json(result);
        }
    });
});

router.post("/shorten", (req, res) => {

    var linkDetails = req.body.details;
    var link = req.body.link;
    var route = req.body.route;

    const query = `INSERT INTO link (linkFor, originalLink, code, count) VALUES (?, ?, ?, ?)`;
    const params = [linkDetails, link, route, count];
    db.query(query, params, (error, result) => {
        if (error) {
            res.send(error);
            return;
        }
    });

    //Create new route that redirects to the url
    app.get(`/${route}`, (req, res) => {
        res.redirect(link);
        count++;
    });
    res.send({ message: "Route Created", path: route });

});

module.exports = router;
