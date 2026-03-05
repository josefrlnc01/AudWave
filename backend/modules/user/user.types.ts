import { userSchema } from "./user.model.js"
import z from 'zod'

export type UserRegistrationForm = {
    name: string,
    email: string
    password: string,
    password_confirmation: string
}


export type UserType = z.infer<typeof userSchema>

