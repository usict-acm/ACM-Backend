import * as express from 'express';
import { query } from '../database.js';
import Exception from '../exception.js';


const router = express.Router();

router.get("/blogs", async (_req, res, next) => {
    try {
        let result = await query("SELECT * FROM blogs");
        res.send(result);
    } catch (e) {
        return next(new Exception(400, e.toString()));
    }
});

router.post("/singleBlog", async (req, res, next) => {
    try {
        const blogId = req.body.blogId;

        if (isNaN(Number(blogId))) {
            return next(new Exception(400, "Only number as blogId"));
        }

        let result = await query(
            `SELECT * FROM blogs WHERE blogId = ?`,
            [blogId]
        );
        res.send(result);
    } catch (e) {
        return next(new Exception(400, e.toString()));
    }
});

router.post("/deleteBlog", async (req, res, next) => {
    try {
        const blogId = req.body.id;
        let sql = `DELETE FROM blogs WHERE blogId=?`;
        await query(sql, [blogId]);
        res.send({ message: "Deleted" });
    } catch (e) {
        return next(new Exception(400, e.toString()));
    }
});

router.post("/blog/create", async (req, res) => {
    try {
        const email = req.body.email;
        const title = req.body.title;
        const content = req.body.content;
        const Image = req.body.image;
        let result = await query(
            `SELECT * FROM dashboardusers WHERE email=?`,
            [email])
        if (result[0] === null) {
            return next(new Exception(400, "Invalid request this user doesn't exist"));
        }
        let sql = `INSERT INTO blogs (userEmail, userName, blogTitle, coverImage, content) VALUES ( ?, ?, ?, ?, ?)`;
        await query(sql, [email, result[0].name, title, Image, content]);
        res.send({ message: "Blog Added" });
    } catch (e) {
        return next(new Exception(400, e.toString()));
    }
});


router.post("/changeStatus", async (req, res, next) => {
    try {
        const blogId = req.body.id
        let sql = `UPDATE blogs SET approved = 1 WHERE blogId=? `;
        await query(sql, [blogId]);
        res.send({ message: "Blog approved" });
    } catch (e) {
        return next(new Exception(400, e.toString()));
    }
});

export default router;
