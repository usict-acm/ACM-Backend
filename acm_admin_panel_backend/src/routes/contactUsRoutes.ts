import * as express from 'express';
import Exception from '../exception.js';
import { prisma } from '../database.js';

const router = express.Router();


router.get("/contactus", async (_req, res, next) => {
    try {
        let result = await prisma.contactUs.findMany();
        res.send(result);
    } catch (e : any) {
        return next(new Exception(400, "Internal server erro!"));
    }
})


export default router;
