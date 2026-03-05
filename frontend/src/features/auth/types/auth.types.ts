import { registrationFormSchema } from "../schemas/auth.schema"
import z from 'zod'

export type UserLoginForm = {
    email: string
    password: string
}


export type RegistrationForm = z.infer<typeof registrationFormSchema>