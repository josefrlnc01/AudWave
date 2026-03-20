import { NextFunction, Request, Response } from 'express'
import { youtubeVideoSchema } from '../../modules/youtube-video/youtube-video.schema.js'

export const validateProcessVideo = (req:Request, res:Response, next:NextFunction) => {
    const result = youtubeVideoSchema.safeParse(req.body)
    if (!result.success) {
        return res.status(400).json({error: result.error.message})
    }

    req.body = result.data
    return next()
}
