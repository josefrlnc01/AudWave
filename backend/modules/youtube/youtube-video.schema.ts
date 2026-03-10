import z from "zod";


export const youtubeVideoSchema = z.object({
    videoId: z.string(),
    title: z.string(),
    text: z.string()
})

export type StoredSchema = z.infer<typeof youtubeVideoSchema>