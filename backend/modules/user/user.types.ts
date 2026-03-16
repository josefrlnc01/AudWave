import { userSchema } from "./user.model.js"
import z from 'zod'

import type {DecodedIdToken} from "firebase-admin/auth"
export type UserRegistrationForm = {
    name: string,
    email: string
    password: string,
    password_confirmation: string
}

export type UserGoogleRegistration = {
    userData: {
        name: string,
    email: string,
    token: string
    },
    decodedToken: string | DecodedIdToken
}


export type UserType = z.infer<typeof userSchema>

