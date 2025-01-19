import { z } from 'zod';

export const clashSchema = z.object({
    title: z.string({ message: "Title is required" }).min(3, { message: "Title must be 3 characters long." }).max(60, { message: "Title must be less than 60 characters long." }),
    description: z.string({ message: "Description is required" }).min(3, { message: "Description must be 3 characters long." }).max(1000, { message: "Description must be less than 1000 characters long." }),
    expire_at: z.string({ message: "Expire at is required." }).min(5, {
        message: "Please pass correct date"
    }),
    image: z.string().optional()
})