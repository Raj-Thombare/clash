import { authLimitter } from './../config/rateLimit.js';
import { Router, Response, Request } from "express";
import { loginSchema, registerSchema } from "../validation/authValidation.js";
import prisma from "../config/database.js";
import { formatError, renderEmailEjs } from "../helper.js";
import { ZodError } from "zod";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { emailQueue, emailQueueName } from "../jobs/EmailJob.js";
import jwt from "jsonwebtoken";
import authMiddleware, { AuthenticatedRequest } from "../middleware/AuthMiddleware.js";

const router = Router();

router.post("/login", authLimitter, async (req: Request, res: Response): Promise<any> => {
    try {

        const body = req.body;

        const payload = loginSchema.parse(body);

        const user = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        })

        if (!user || user == null) {
            return res.status(422).json({
                errors: {
                    email: "No user found with this email."
                }
            })
        }

        const compare = await bcrypt.compare(payload.password, user.password);

        if (!compare) {
            return res.status(422).json({
                errors: {
                    email: "Invalid Credentials."
                }
            })
        }

        const JWTPayload = {
            id: user.id,
            name: user.name,
            email: user.email
        }

        const token = jwt.sign(JWTPayload, process.env.SECRET_KEY!, {
            expiresIn: "365d"
        })

        return res.json({
            message: "Logged in successfully!",
            data: {
                ...JWTPayload,
                token: `Bearer ${token}`
            }
        })
    } catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({ message: "Invalid data", errors })
        }

        return res.status(500).json({ message: "Something went wrong! please try again." })
    }
})

//login check route
router.post("/check/credentials", authLimitter, async (req: Request, res: Response): Promise<any> => {
    try {

        const body = req.body;

        const payload = loginSchema.parse(body);

        const user = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        })

        if (!user || user == null) {
            return res.status(422).json({
                errors: {
                    email: "No user found with this email."
                }
            })
        }

        const compare = await bcrypt.compare(payload.password, user.password);

        if (!compare) {
            return res.status(422).json({
                errors: {
                    email: "Invalid Credentials."
                }
            })
        }

        return res.json({
            message: "Logged in successfully!",
            data: {

            }
        })
    } catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({ message: "Invalid data", errors })
        }

        return res.status(500).json({ message: "Something went wrong! please try again." })
    }
})

router.post("/register", authLimitter, async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body;
        const payload = registerSchema.parse(body);

        const user = await prisma.user.findUnique({
            where: {
                email: payload.email,
            },
        });

        if (user) {
            return res.status(422).json({
                email: "Email already taken. please use another one.",
            });
        }

        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(payload.password, salt);

        const token = await bcrypt.hash(uuidv4(), salt);
        const url = `${process.env.APP_URL}/verify-email?email=${payload.email}&token=${token}`;

        const emailbody = await renderEmailEjs("email-verify", {
            name: payload.name,
            url: url,
        });

        await emailQueue.add(emailQueueName, {
            to: payload.email,
            subject: "Clash Email Verification",
            body: emailbody,
        });

        await prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: payload.password,
                email_verify_token: token,
            },
        });

        return res.json({
            message: "Please check your email. we have sent you a verification email.",
        });
    } catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({ message: "Invalid data", errors });
        }

        return res.status(500).json({
            message: "Something went wrong! please try again.",
        });
    }
});

router.get("/user", authMiddleware, async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    const user = req.user;

    return res.json({ data: user })
})

export default router;