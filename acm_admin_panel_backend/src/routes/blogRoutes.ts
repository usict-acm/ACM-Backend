import * as express from 'express';
import { prisma } from '../database.js';
import Exception from '../exception.js';


const router = express.Router();

router.get("/blogs", async (_req, res, next) => {
    try {
        let result = await prisma.blogs.findMany();
        res.send(result);
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }
});

router.post("/singleBlog", async (req, res, next) => {
    try {
        const blogId = Number(req.body.blogId);
        let result = await prisma.blogs.findFirst(
            {
                where:
                    { blogId: blogId }
            });
        res.send(result);
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }
});

router.post("/deleteBlog", async (req, res, next) => {
    try {
        const blogId = Number(req.body.id);
        await prisma.blogs.delete(
            {
                where:
                    { blogId: blogId }
            });
        res.send({ message: "Deleted" });
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }
});

router.post("/blog/create", async (req, res, next) => {
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


router.post("/changeStatus", async (req, res, next) => {
    try {
        const blogId = Number(req.body.id);
        await prisma.blogs.update(
            {
                data:
                    { approved: true },
                where:
                    { blogId: blogId }
            });
        res.send({ message: "Blog approved" });
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }
});

export default router;
