import * as express from "express";
import { prisma } from "../database.js";
import Exception from "../exception.js";
import { encodeSession } from "../utils/session.js";

const router = express.Router();

router.post("/login", async (req, res, next) => {
    try {
        let email = String(req.body.email);
        let password = String(req.body.password);
        const user = await prisma.dashboardUsers.findFirst({
            where: { email: email, password: password },
        });
        if (!user) {
            throw "email or passowrd incorrect!";
        }
        const session = encodeSession("SECRET_KEY_HERE", {
            id: user.id,
            email: user.email,
            dateCreated: Math.floor(+new Date() / 1000),
        });
        res.setHeader("X-JWT-Token", session.token);
        res.status(200).json(session);
    } catch (e: any) {
        return next(new Exception(400, e.toString()));
    }
});

export default router;
