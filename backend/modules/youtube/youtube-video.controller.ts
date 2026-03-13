import { Request, Response } from "express";
import { insertTranscription, insertTranslation } from "./youtube-video.service.js";
import { youtubeVideoTranscriptionSchema, youtubeVideoTranslationSchema } from "./youtube-video.schema.js";
import { translateText } from "../translation/translation.service.js";
import { VideoService } from "../video/video.service.js";
import { DataOfId, RequestProps } from "../video/video.types.js";
import fs from "node:fs/promises"
import getVideoId from "get-video-id";

export class YoutubeVideoController {
    static init = async (req: Request, res: Response) => {
        const { videoLink }: RequestProps = req.body

        const lang = String(req.params.lang)

        await fs.writeFile('link.json', JSON.stringify({ key: videoLink }))

        const dataOfId: DataOfId = getVideoId(videoLink)
        const id = dataOfId.id

        if (!id || typeof id === 'undefined' || typeof id !== 'string') {
            const error = new Error('No se pudo procesar el id correctamente')
            return res.status(400).json({ error: error.message })
        }

        const isValid = await VideoService.isValidLength(id)
        if (!isValid) {
            const message = "El vídeo es muy largo"
            return res.status(403).json(message)
        }

        try {
            const data = await VideoService.getSubtitlesFromVideo(id)
            if (!data) {
                const error = new Error('No se pudo obtener la transcripción del vídeo')
                return res.status(400).json({ error: error.message })
            }
            const { youtubeVideoText, title } = data
            if (lang === 'not') {
                return res.json({ title, youtubeVideoText, id })
            }
            const translatedYoutubeVideo = await translateText(lang, youtubeVideoText)
            return res.json({ title, translatedYoutubeVideo, youtubeVideoText, id })
        } catch (err) {
            console.error('Error processing video:', err)
            return res.status(500).json({ error: 'Failed to process video' })
        }
    }


    static saveTranscription = async (req: Request, res: Response) => {
        try {
            const user = req.user
            const data = youtubeVideoTranscriptionSchema.parse(req.body)
            await insertTranscription({ data, user })
            return res.status(201).send('Transcripción guardada correctamente')
        } catch (error) {
            if (error instanceof Error) {
                return res.status(409).json({ error: error.message })
            }
            return res.status(500).json({ error: 'Hubo un error al guardar el vídeo' })
        }
    }


    static saveTranslation = async (req: Request, res: Response) => {
        try {
            const user = req.user
            const data = youtubeVideoTranslationSchema.parse(req.body)
            await insertTranslation({data, user})
            return res.status(201).send('Traducción guardada correctamente')
        } catch (error) {
            console.error(error)
            return res.status(500).json({error: 'Hubo un error al guardar la traducción'})
        } 
    }
}