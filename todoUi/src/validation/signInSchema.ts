import { z } from "zod";
import { emailValidation, passwordValidation } from "./global";

export const signInSchema = z.object({
    email: emailValidation,
    password: passwordValidation
})


export type TSignInForm = z.infer <typeof signInSchema>