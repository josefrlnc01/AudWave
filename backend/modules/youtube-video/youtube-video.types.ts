import { IUser } from "../user/user.model.js"
import {  youtubeVideoTranscriptionSchema, youtubeVideoTranslationSchema } from "./youtube-video.schema.js"
import z from 'zod'

export type InsertTranscriptionProps = {
    data: StoredTranscriptionSchema
    user: IUser
}

export type InsertTranslationProps = {
    data: StoredTranslationSchema,
    user: IUser
}


export type StoredTranscriptionSchema = z.infer<typeof youtubeVideoTranscriptionSchema>
export type StoredTranslationSchema = z.infer<typeof youtubeVideoTranslationSchema>