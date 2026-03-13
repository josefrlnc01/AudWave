import z from "zod";


export const youtubeVideoSchema = z.object({
    title: z.string(),
    youtubeVideoText: z.string()
})

export type StoredSchema = z.infer<typeof youtubeVideoSchema>