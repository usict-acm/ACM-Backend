import * as express from 'express';
import { prisma } from '../database.js';
import Exception from '../exception.js';


const router = express.Router();

router.get("/blog", async (_req, res, next) => {
    try {
        let result = await prisma.blogs.findMany();
        res.send(result);
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }
});

router.get("/blog/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        let result = await prisma.blogs.findFirst(
            {
                where:
                    { id: id }
            });
        res.send(result);
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }
});

router.delete("/blog/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await prisma.blogs.delete(
            {
                where:
                    { id: id }
            });
        res.send({ message: "Deleted" });
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }
});

router.post("/blog", async (req, res, next) => {
    try {
        const email = String(req.body.email);
        const title = String(req.body.title);
        const content = String(req.body.content);
        const image = String(req.body.image);
        let result = await prisma.dashboardUsers.findFirst(
            {
                where:
                    { email: email }
            });
        if (!result) {
            return next(new Exception(400, "Invalid request this user doesn't exist"));
        }
        await prisma
            .blogs
            .create({
                data:
                {
                    userEmail: email,
                    userName: result.name,
                    coverImage: Buffer.from(image),
                    content: Buffer.from(content),
                    blogTitle: title,
                    isDraft: true
                }
            });
        res.send({ message: "Blog Added" });
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }
});


router.patch("/blog/:id/approve/:approved", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const approved = Boolean(req.params.approved);
        await prisma.blogs.update(
            {
                data:
                    { approved: approved , isDraft: false},
                where:
                    { id: id }
            });
        res.send({ message: "Blog approved" });
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }
});

export default router;
