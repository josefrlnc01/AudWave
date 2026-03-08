import { Request, Response } from "express";
import { insert } from "./stored.service.js";

export class VideoStoredController {
    static saveVideo = async (req: Request, res: Response) => {
        try {
            const {videoId, title, text} = req.body
            const user = req.user
            
            await insert({videoId, title, text, user})
            return res.status(201).send('Video guardado correctamente')
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({error: error.message})
            }
            return res.status(500).json({error: 'Hubo un error al guardar el vídeo'})
        }
    }       
}