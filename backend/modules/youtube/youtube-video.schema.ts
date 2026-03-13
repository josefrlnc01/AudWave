import z from "zod";


export const youtubeVideoTranscriptionSchema = z.object({
    title: z.string(),
    comment: z.string(),
    youtubeVideoText: z.string()
})

export const youtubeVideoTranslationSchema = z.object({
    title: z.string(),
    comment: z.string(),
    translatedYoutubeVideo: z.string()
})

export type StoredTranscriptionSchema = z.infer<typeof youtubeVideoTranscriptionSchema>
export type StoredTranslationSchema = z.infer<typeof youtubeVideoTranslationSchema>