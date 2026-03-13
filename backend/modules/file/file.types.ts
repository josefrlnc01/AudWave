import { IUser } from "../user/user.model.js"

export type InsertFileTranscriptionProps = {
    title: string
    fileText: string,
    comment: string | null
    user: IUser
}