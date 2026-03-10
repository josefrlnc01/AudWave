import { Request, Response } from "express";
import { insert } from "./youtube-video.service.js";
import {youtubeVideoSchema } from "./youtube-video.schema.js";

export class YoutubeVideoController {
    static saveVideo = async (req: Request, res: Response) => {
        try {
            const user = req.user
            const data = youtubeVideoSchema.parse(req.body)
            await insert({data, user})
            return res.status(201).send('Video guardado correctamente')
        } catch (error) {
            if (error instanceof Error) {
                return res.status(409).json({error: error.message})
            }
            return res.status(500).json({error: 'Hubo un error al guardar el vídeo'})
        }
    }       
}