import { IUser } from "../user/user.model.js"
import { fileTranscriptionSchema, fileTranslationSchema } from "./file.schema.js"
import z from 'zod'
export type InsertFileTranscriptionProps = {
    data: StoredFileTranscriptionSchema,
    user: IUser
}

export type InsertFileTranslationProps = {
    data: StoredFileTranslationSchema,
    user: IUser
}


export type StoredFileTranscriptionSchema = z.infer<typeof fileTranscriptionSchema>

export type StoredFileTranslationSchema = z.infer<typeof fileTranslationSchema>