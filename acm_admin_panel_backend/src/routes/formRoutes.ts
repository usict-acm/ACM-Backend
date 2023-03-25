import * as express from 'express';
import Exception from '../exception.js';
import { prisma } from '../database.js';

const router = express.Router();


router.get("/form", async (_req, res, next) => {
    try {
        let result = await prisma.forms.findMany();
        res.send(result);
    } catch (e : any) {
        return next(new Exception(400, "Internal server erro!"));
    }
})

router.delete("/form/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await prisma.forms.delete({ where : { id : id}});
        res.json({message :"done!"});
    } catch (e : any) {
        return next(new Exception(400, "Internal server erro!"));
    }
})


export default router;
