import { IUser } from "../user/user.model.js"

export type InsertFileTranscriptionProps = {
    title: string
    fileText: string,
    comment: string | null
    user: IUser
}


export type InsertFileTranslationProps = {
    title: string,
    translatedFile: string,
    comment: string | null,
    user: IUser
}