import * as express from 'express';
import { prisma } from '../database.js';
import Exception from '../exception.js';

const router = express.Router();

router.get("/linkTable", async (_req, res, next) => {
    try {
        let result = await prisma.link.findMany(
            {
                orderBy: { id: 'desc' }
            });
        res.send(result);
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }
});

router.post("/shorten", async (req, res, next) => {

    try {
        const linkFor = String(req.body.linkFor);
        // need a valid url
        const originalLink = new URL(String(req.body.originalLink));
        const code = String(req.body.code);
        let result = await prisma.link.count({ where: { code: code } });
        if (result > 0) {
            return next(new Exception(403, "this route alreay exists!"));
        }
        await prisma.link.create(
            {
                data:
                {
                    linkFor: linkFor,
                    originalLink: originalLink.toString(),
                    code: code,
                    count: 0
                }
            });
        res.send(code);
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }


});


router.get('/acm/:shortPath', async (req, res, next) => {
    try {
        const shortPath: string = req.params.shortPath;
        let result = await prisma.link.findFirst({
            where: {
                code: shortPath,
            }
        });
        if (result) {
            return res.redirect(result.originalLink);
        }
        return next(new Exception(404, "short link not found!"));
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }

})

export default router;
