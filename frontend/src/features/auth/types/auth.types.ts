import { registrationFormSchema } from "../schemas/auth.schema"
import z from 'zod'

export type UserLoginForm = {
    email: string
    password: string
}

export type NewPasswordForm = {
    password: string;
    password_confirmation: string;
}

export type TokenConfirmation = {
    token: string;
}

export type ForgotPasswordForm = {
    email: string
}
export type RegistrationForm = z.infer<typeof registrationFormSchema>