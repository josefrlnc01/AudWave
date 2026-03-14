import { IUser } from "../user/user.model.js"
import { StoredFileTranscriptionSchema, StoredFileTranslationSchema } from "./file.schema.js"

export type InsertFileTranscriptionProps = {
    data: StoredFileTranscriptionSchema,
    user: IUser
}

export type InsertFileTranslationProps = {
    data: StoredFileTranslationSchema,
    user: IUser
}