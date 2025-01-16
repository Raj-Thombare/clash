import { Router, Response, Request } from "express";
import { registerSchema } from "../validation/authValidation.js";
import prisma from "../config/database.js";
import { formatError, renderEmailEjs } from "../helper.js";
import { ZodError } from "zod";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { emailQueue, emailQueueName } from "../jobs/EmailJob.js";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const payload = registerSchema.parse(body);

        const user = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        })

        if (user) {
            res.status(422).json({
                email: "Email already taken. please use another one."
            })
        }

        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(payload.password, salt);

        const token = await bcrypt.hash(uuidv4(), salt);
        const url = `${process.env.APP_URL}/verify-email?email=${payload.email}&token=${token}`;

        const emailbody = await renderEmailEjs("email-verify", {
            name: payload.name, url: url
        })

        await emailQueue.add(emailQueueName, { to: payload.email, subject: "Clash Email Verification", body: emailbody })

        await prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: payload.password,
                email_verify_token: token
            }
        })

        res.json({ message: "Please check your email. we have sent you a verification email." })

    } catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            res.status(422).json({ message: "Invalid data", errors })
        }

        res.status(500).json({ message: "Something went wrong! please try again." })
    }
})

export default router;