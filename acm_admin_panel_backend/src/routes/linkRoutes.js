import * as express from 'express';
import { query } from '../database.js';

const router = express.Router();

let count = 0;
router.get("/linkTable", async (_req, res, next) => {
    try {
        let result = await query(`SELECT * FROM  link ORDER BY id DESC`);
        res.send(result);
    } catch (e) {
        return next(new Exception(400, e.toString()));
    }
});

router.post("/shorten", async (req, res, next) => {

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
    router.get(`/${route}`, (req, res) => {
        res.redirect(link);
        count++;
    });
    res.send({ message: "Route Created", path: route });

});

export default router;
