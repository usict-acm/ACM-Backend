import * as express from 'express';
import { prisma } from '../database.js';
import Exception from '../exception.js';

const router = express.Router();
router.get("/displayTeam", async (_req, res, next) => {
    try {
        let result = await prisma.team.findMany({ 
            orderBy: { id: 'desc' } });
        res.json(result);
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }
});
router.post("/teams/insert", async (req, res, next) => {
    try {
        const data = req.body;
        data.added_on = new Date();
        let result = await prisma.team.create({ data: data });
        res.send(result);
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }
});
export default router;
