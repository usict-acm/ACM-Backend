import * as express from 'express';
import { query } from '../database.js';
import Exception from '../exception.js';

const router = express.Router();


router.get("/joinus", async (_req, res, next) => {
    try{
        let result = await query(`SELECT * FROM join_us ORDER BY  id  DESC `);
        res.json(result);
    } catch(e) {
        return next(new Exception(400, e.toString()));
    }
})


export default router;
