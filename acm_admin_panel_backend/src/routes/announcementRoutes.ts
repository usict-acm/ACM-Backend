import * as express from 'express';
import { prisma } from '../database.js';
import Exception from '../exception.js';

const router = express.Router();

router.get("/displayAnnouncement", async (_req, res, next) => {
    try {
        let results = await prisma.event.findMany();
        res.send({ message: "Success", event: results });
    } catch (e) {
        return next(new Exception(400, "Internal server erro!"));
    }
});
router.post("/announcements/insert", async (req, res, next) => {
    try {
        let data = req.body;
        //   const github = req.body.github;
        //   const instagram = req.body.instagram;
        //   const year = req.body.year;
        //   const category = req.body.category;
        await prisma.event.create({ data: data });
        res.send("Successfully added");
    } catch (e) {
        return next(new Exception(400, "Error!"));
    }
});
//delete and member
router.post("/announcements/delete", async (req, res, next) => {
    try {
        const name = String(req.body.name);
        await prisma.event.deleteMany({
            where: {
                name: name
            }
        });
        res.send("successfully deleted an annoucement");
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }
});

export default router;
