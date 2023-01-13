import * as express from 'express';
import { prisma } from '../database.js';
import Exception from '../exception.js';

const router = express.Router();

router.get("/event", async (_req, res, next) => {
    try {
        let results = await prisma.event.findMany();
        res.send(results);
    } catch (e) {
        return next(new Exception(400, "Internal server erro!"));
    }
});
router.post("/event", async (req, res, next) => {
    try {
        let data = req.body;
        //   const github = req.body.github;
        //   const instagram = req.body.instagram;
        //   const year = req.body.year;
        //   const category = req.body.category;
        await prisma.event.create({ data: data });
        res.json({ message: "Successfully added" });
    } catch (e) {
        return next(new Exception(400, "Error!"));
    }
});
//delete and member
router.delete("/event/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await prisma.event.deleteMany({
            where: {
                id : id 
            }
        });
        res.json({ message: "successfully deleted an annoucement" });
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }
});

export default router;
