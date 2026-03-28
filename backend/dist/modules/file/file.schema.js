import z from 'zod';
export const fileTranscriptionSchema = z.object({
    title: z.string(),
    comment: z.string(),
    fileText: z.string()
});
export const fileTranslationSchema = z.object({
    title: z.string(),
    comment: z.string(),
    translatedFile: z.string()
});
