import * as express from 'express';
import { query } from '../database.js';

const router = express.Router();


router.get("/contactus", async (_req, res, next) => {
    try {
        let result = await query(`SELECT * FROM contactus`)
        res.send(result);
    } catch (e) {
        return next(new Exception(400, "Internal server erro!"));
    }
})


export default router;
