import { Router, Response, Request } from "express";
import prisma from "../config/database.js";
import { formatError, imageValidator, removeImage, uploadFile } from "../helper.js";
import { ZodError } from "zod";
import { clashSchema } from "../validation/clashValidation.js";
import { UploadedFile } from "express-fileupload";
import authMiddleware from "../middleware/AuthMiddleware.js";

const router = Router();

router.get("/", authMiddleware, async (req: Request, res: Response): Promise<any> => {
    try {
        const clashs = await prisma.clash.findMany({
            where: { user_id: req.user?.id },
        });
        return res.json({ message: "Data Fetched", data: clashs });

    } catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({ message: "Invalid data", errors })
        }

        return res.status(500).json({ message: "Something went wrong! please try again." })
    }
})

router.get("/:id", authMiddleware, async (req: Request, res: Response): Promise<any> => {
    try {

        const { id } = req.params;
        const clash = await prisma.clash.findUnique({
            where: { id: Number(id) },
            select: {
                id: true,
                title: true
            },
        });
        return res.json({ message: "Data Fetched", data: clash });

    } catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({ message: "Invalid data", errors })
        }

        return res.status(500).json({ message: "Something went wrong! please try again." })
    }
})

router.put("/:id", authMiddleware, async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const body = req.body;
        const payload = clashSchema.parse(body);

        if (req.files?.image) {
            const image = req.files?.image as UploadedFile;
            const validMsg = imageValidator(image.size, image.mimetype);
            if (validMsg) {
                return res.status(422).json({ errors: { image: validMsg } })
            }

            const clash = await prisma.clash.findUnique({
                where: {
                    id: Number(id)
                },
                select: {
                    id: true,
                    image: true
                }
            })

            if (clash) removeImage(clash?.image)
            payload.image = await uploadFile(image);
        }

        await prisma.clash.update({
            where: {
                id: Number(id)
            },
            data: {
                ...payload,
                expire_at: new Date(payload.expire_at)
            }
        })

        return res.json({ message: "Clash updated successfully!" })

    } catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({ message: "Invalid data", errors })
        }

        return res.status(500).json({ message: "Something went wrong! please try again." })
    }
})

router.post("/", authMiddleware, async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body;
        const payload = clashSchema.parse(body);

        if (req.files?.image) {
            const image = req.files?.image as UploadedFile;
            const validMsg = imageValidator(image.size, image.mimetype);
            if (validMsg) {
                return res.status(422).json({ errors: { image: validMsg } })
            }
            payload.image = await uploadFile(image);
        } else {
            return res.status(422).json({
                errors: { image: "Image field is required" }
            })
        }

        await prisma.clash.create({
            data: {
                ...payload,
                user_id: req.user?.id!,
                expire_at: new Date(payload.expire_at),
                image: payload.image!
            }
        })

        return res.json({ message: "Clash created successfully!" })

    } catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({ message: "Invalid data", errors })
        }

        return res.status(500).json({ message: "Something went wrong! please try again." })
    }
})

router.delete("/:id", authMiddleware, async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        const clash = await prisma.clash.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                image: true
            }
        })

        if (clash) removeImage(clash?.image)

        await prisma.clash.delete({
            where: { id: Number(id) },
        });

        return res.json({ message: "Clash deleted successfully!" });

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong! please try again." })
    }
})

export default router;