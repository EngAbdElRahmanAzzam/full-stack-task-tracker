import z from 'zod'


export const emailValidation = z.string().email("Not valid email must like example@gmail.com")
export const passwordValidation = z.string().min(8, "Password must be at Least 8 charachters").max(50, "Password must be less than 50 charachters")