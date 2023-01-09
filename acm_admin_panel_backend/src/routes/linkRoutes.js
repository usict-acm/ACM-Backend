import * as express from 'express';
import db, { query } from '../database.js';
import Exception from '../exception.js';

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

    try {
        const linkDetails = req.body.details;
        const originalLink = req.body.url;
        let shortPath = req.body.shortPath;
        if (typeof (shortPath) !== 'string') {
            return next(new Exception(400, "shortPath is not a string"));
        }

        db.query(`SELECT * FROM link WHERE code = ?`, [shortPath],
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ error: 'An error occurred' });
                } else if (results.length > 0) {
                    res.status(400).json({ error: 'Short path already exists' });
                } else {
                    //Insert new link into db
                    db.query(`INSERT INTO link (linkFor, originalLink, code, count) VALUES (?, ?, ?, ?)`,
                        [linkDetails, originalLink, shortPath, count],
                        (error) => {
                            if (error) {
                                console.log(error);
                                res.status(500).json({ error: 'An error occured' });
                            } else {
                                res.json({ shortPath });
                            }
                        })
                }
            });
    } catch (e) {
        return next(new Exception(400, e.toString()));
    }


});


router.get('/acm/:shortPath', (req, res) => {
    const shortPath = req.params.shortPath;

    //find original link
    try {
        db.query(`SELECT * FROM link WHERE code = ?`, [shortPath],
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ error: 'An error occurred' });
                } else if (results.length === 0) {
                    res.status(400).json({ error: 'Short path not found' });
                } else {
                    const originalLink = results[0].originalLink;
                    res.redirect(originalLink);
                }
            });
    } catch (e) {
        res.json({ error: 'Internal server error!' });
    }

})

export default router;
