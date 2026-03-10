import { IUser } from "../user/user.model.js"

export type InsertFileProps = {
    text: string,
    translated: string | null,
    user: IUser
}