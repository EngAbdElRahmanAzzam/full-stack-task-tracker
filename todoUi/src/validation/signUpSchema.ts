import { z } from "zod";


export const signUpSchema = z.object({
    firstName : z.string().min(3, "First Name Must be at Least 3 charachters").max(50, "First Name Must be less than 50 charachters"),
    lastName : z.string().min(3, "Last Name Must be at Least 3 charachters").max(50, "Last Name Must be less than 50 charachters"),
    email:z.string().email("Not valid email must like example@gmail.com"),
    phone:z.string().regex(/^(?:\+20|0)?(10|11|12|15)[0-9]{8}$/,"Invalid Egyptian phone number"),
    password: z.string().min(8, "Password must be at Least 8 charachters").max(50, "Password must be less than 50 charachters"),
    re_password : z.string().min(8, "Password must be at Least 8 charachters").max(80, "Password must be less than 50 charachters")
})
.refine(
    data => data.password ===  data.re_password , 
    {
        message: "Not matched password",
        path:['re_password']
    }
)


export type TSignUpForm = z.infer <typeof signUpSchema>