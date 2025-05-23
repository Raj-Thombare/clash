import { Router, Response, Request } from "express";
import prisma from "../config/database.js";
import { authLimitter } from './../config/rateLimit.js';
import { ZodError } from "zod";
import { checkDateHourDiff, formatError, renderEmailEjs } from "../helper.js";
import { forgetPasswordSchema, resetPasswordSchema } from "../validation/passwordValidation.js";
import bcrypt from 'bcrypt';
import { v4 as uuid4 } from "uuid";
import { emailQueue, emailQueueName } from "../jobs/EmailJob.js";
import { Queue } from "bullmq";
import { redisConnection } from "../config/queue.js";

const router = Router();

router.post("/forget-password", authLimitter, async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body;
        const payload = forgetPasswordSchema.parse(body)

        const user = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        })

        if (!user || user == null) {
            return res.status(422).json({
                message: "Invalid Data", errors: {
                    email: "No user found with this email."
                }
            })
        }

        const salt = await bcrypt.genSalt(10);
        const token = await bcrypt.hash(uuid4(), salt);

        await prisma.user.update({
            data: {
                password_reset_token: token,
                token_send_at: new Date().toISOString()
            },
            where: {
                email: payload.email
            }
        })

        const url = `${process.env.CLIENT_APP_URL}/reset-password?email=${payload.email}&token=${token}`;

        const html = await renderEmailEjs("forget-password", { url: url });

        await emailQueue.add(emailQueueName, {
            to: payload.email,
            subject: "Reset your password",
            body: html
        })

        return res.json({ message: "Password reset link sent successfully! Please check your email." })
    } catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({ message: "Invalid data", errors })
        }

        return res.status(500).json({ message: "Something went wrong! please try again." })
    }
})


router.post("/reset-password", authLimitter, async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body;
        const payload = resetPasswordSchema.parse(body)

        const user = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        })

        if (!user || user == null) {
            return res.status(422).json({
                message: "Invalid Data", errors: {
                    email: "Link is not correct, make sure you copied correct link."
                }
            })
        }

        if (user.password_reset_token !== payload.token) {
            return res.status(422).json({
                message: "Invalid Data", errors: {
                    email: "Link is not correct, make sure you copied correct link."
                }
            })
        }

        const hoursDiff = checkDateHourDiff(user.token_send_at!);

        if (hoursDiff > 2) {
            return res.status(422).json({
                message: "Invalid Data", errors: {
                    email: "Password reset token got expired. Please send new token."
                }
            })
        }

        const salt = await bcrypt.genSalt(10);
        const newPass = await bcrypt.hash(payload.password, salt);

        await prisma.user.update({
            where: {
                email: payload.email
            },
            data: {
                password: newPass,
                password_reset_token: null,
                token_send_at: null
            }
        })

        return res.json({ message: "Password reset successfully!. Please try to login again." })
    } catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({ message: "Invalid data", errors })
        }

        return res.status(500).json({ message: "Something went wrong! please try again." })
    }
})

export default router;