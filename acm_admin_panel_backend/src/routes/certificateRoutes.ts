import * as express from 'express';
import { prisma } from '../database.js';
import { Certificate } from '@prisma/client';
import Exception from '../exception.js';
import { randomUUID } from 'crypto';

const router = express.Router();


router.get("/certificate", async (_req, res, next) => {
    try {
        let result = await prisma.certificate.findMany({
            orderBy: { startDate: 'desc' }
        });
        res.send(result);
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }
})


router.post("/certificate", async (req, res, next) => {
    try {
        let data = req.body as Certificate;
        console.log(data);
        data.uniqueNo = randomUUID().substring(0, 6);
        let result = await prisma.certificate.create({
            data: data,
        });
        res.json(result);
    } catch (e: any) {
        console.log(e);
        return next(new Exception(400, e.toString()));
    }
})

router.delete("/certificate/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await prisma.certificate.delete({ where: { id: id } });
        res.send("done");
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }
})


export default router;
