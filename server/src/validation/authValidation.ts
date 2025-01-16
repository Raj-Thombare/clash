import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string({ message: "Name is required" }).min(3, { message: "Name must be 3 characters long." }),
    email: z.string({ message: "Email is required" }).email({ message: "please type correct email." }),
    password: z.string({ message: "Password is required" }).min(6, { message: "password must be 6 characters long." }),
    confirm_password: z.string({ message: "Confirm Password is required" }).min(6, { message: "confirm password must be 6 characters long." })
}).refine((data) => data.password == data.confirm_password, { message: "Confirm password do not match.", path: ["confirm_password"] })