import * as express from 'express';
import { prisma } from '../database.js';
import Exception from '../exception.js';

const router = express.Router();


router.get("/joinus", async (_req, res, next) => {
    try {
        let result = await prisma.joinUs.findMany({
            orderBy:
                { id: 'desc' }
        });
        res.json(result);
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }
})


export default router;
