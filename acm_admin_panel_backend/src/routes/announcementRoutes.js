import * as express from 'express';
import { query } from '../database.js';
import Exception from '../exception.js';

const router = express.Router();

router.get("/displayAnnouncement", async (_req, res, next) => {
    try {
        let results = await query(`SELECT * FROM event`);
        res.send({ message: "Success", event: results });
    } catch (e) {
        return next(new Exception(400, "Internal server erro!"));
    }
});
router.post("/announcements/insert", async (req, res, next) => {
    try {
        const title = req.body.name;
        const description = req.body.description;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const button1Text = req.body.button1Text;
        const button1Link = req.body.button1Link;
        const button2Text = req.body.button2Text;
        const button2Link = req.body.button2Link;
        const partners = req.body.partners;
        const speakers = req.body.speakers;
        const poster = req.body.poster;
        //   const github = req.body.github;
        //   const instagram = req.body.instagram;
        //   const year = req.body.year;
        //   const category = req.body.category;
        var sql = `INSERT INTO event (name, description, startDate, endDate, button1Text, button1Link, button2Text, button2Link, partners, speakers, poster) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await query(
            sql,
            [title, description, startDate, endDate, button1Text, button1Link, button2Text, button2Link, partners, speakers, poster]);
        res.send("Successfully added");
    } catch (e) {
        return next(new Exception(400, "Error!"));
    }
});
//delete and member
router.post("/announcements/delete", async (req, res, next) => {
    try {
        const name = req.body.name;
        await query("DELETE FROM event WHERE name=?",
            [name]);
        res.send("successfully deleted an annoucement");
    } catch (e) {
        return next(new Exception(400, "Error!"));
    }
});

export default router;
