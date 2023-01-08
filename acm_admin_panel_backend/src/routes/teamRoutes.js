import * as express from 'express';
import { query } from '../database.js';

const router = express.Router();
router.get("/displayTeam", async (_req, res, next) => {
    try {
        let result = await query(`SELECT * FROM team ORDER BY id DESC`);
        res.json(result);
    } catch (e) {
        return next(new Exception(400, e.toString()));
    }
});
router.post("/teams/insert", async (req, res, next) => {
    try {
        const image = req.body.image;
        const name = req.body.name;
        const designation = req.body.designation;
        const linkedin = req.body.linkedin;
        const github = req.body.github;
        const instagram = req.body.instagram;
        const year = req.body.year;
        const category = req.body.category;
        var sql = `INSERT INTO team (image, name, designation, linkedin, github, instagram, year, category) VALUES ( ?, ?, ?, ?, ? ,? ,? ,?)`;
        let result = await query(
            sql,
            [image, name, designation, linkedin, github, instagram, year, category]);
        res.send(result);
    } catch (e) {
        return next(new Exception(400, e.toString()));
    }
});
//delete and member
export default router;
