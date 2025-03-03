import { z } from "zod";
import { emailValidation, passwordValidation } from "./global";


export const signUpSchema = z.object({
    firstName : z.string().min(3, "First Name Must be at Least 3 charachters").max(50, "First Name Must be less than 50 charachters"),
    lastName : z.string().min(3, "Last Name Must be at Least 3 charachters").max(50, "Last Name Must be less than 50 charachters"),
    email:emailValidation,
    mobile:z.string().regex(/^(?:\+20|0)?(10|11|12|15)[0-9]{8}$/,"Invalid Egyptian phone number"),
    password: passwordValidation,
    re_password : passwordValidation
})
.refine(
    data => data.password ===  data.re_password , 
    {
        message: "Not matched password",
        path:['re_password']
    }
)


export type TSignUpForm = z.infer <typeof signUpSchema>