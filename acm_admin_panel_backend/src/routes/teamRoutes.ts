import { Team } from '@prisma/client';
import * as express from 'express';
import { prisma } from '../database.js';
import Exception from '../exception.js';

const router = express.Router();
router.get("/team", async (_req, res, next) => {
    try {
        let result = await prisma.team.findMany({
            orderBy: { id: 'desc' }
        });
        res.json(result);
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }
});

router.get("/team/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        let data = await prisma.team.findFirst({
            where: { id: id }
        });
        if (!data) {
            return next(new Exception(404, "resource not found!"));
        }
        let result: any = { ...data };
        res.json(result);
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }
});

router.patch("/team/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const data: Partial<Team> = req.body;
        let result = await prisma.team.update({
            where: { id: id },
            data: data,
        });
        res.json(result);
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }
});


router.post("/team", async (req, res, next) => {
    try {
        const data = req.body;
        data.added_on = new Date();
        let result = await prisma.team.create({ data: data });
        res.json(result);
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }
});

router.delete("/team/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await prisma.team.delete({ where: { id: id } });
        res.json("done");
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }
});
export default router;
