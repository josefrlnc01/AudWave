import YoutubeVideo from "./youtube-video.model.js";
import VideoStored from "./youtube-video.model.js";

import { InsertTranscriptionProps, InsertTranslationProps } from "./youtube-video.types.js";


export class YoutubeVideoService {
    static insertTransciption = async ({ data, user }: InsertTranscriptionProps) => {
        try {
        //Comprobación de documento existente
        const videoExists = await VideoStored.findOne({
            user: user._id,
            youtubeVideoText: data.youtubeVideoText
        })

        if (videoExists) {
            throw new Error('Este video ya está guardado')
        }

        //Guardado
        const video = new VideoStored()
        video.title = data.title
        video.comment = data.comment
        video.youtubeVideoText = data.youtubeVideoText
        video.user = user._id

        await video.save()
    } catch (error:any) {
        console.error(error)
        if (error?.code === 1100) {
            throw new Error('Este video ya está guardado')
        }
        throw new Error('Hubo un error al guardar el vídeo')
    }
    }


    static insertTranslation = async ({data, user}: InsertTranslationProps) => {
        try {
        //Comprobación de documento existente
        const fileExists = await YoutubeVideo.findOne({
            user: user,
            translatedYoutubeVideo: data.translatedYoutubeVideo
        })

        if (fileExists) {
            throw new Error('Este documento ya está guardado')
        }
        console.log('data translation', data)

        //Guardado
        const translation = new YoutubeVideo()

        translation.title = data.title
        translation.comment = data.comment
        translation.translatedYoutubeVideo = data.translatedYoutubeVideo
        translation.user = user._id
        await translation.save()
    } catch (error: any) {
        console.log(error)
        if (error?.code === 1100) {
            throw new Error('Este documento ya está guardado')
        }
        throw new Error('Hubo un error al guardar la traducción')
    }
    }

    static getVideoInfo = async (id:string) => {
        try {
        //Obtención de info de video para conocer duración
        const apiKey = process.env.GOOGLE_API_KEY
        const url = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${apiKey}&part=contentDetails`
        const response = await fetch(url)
        if (response) {
            const data = await response.json()
            return (data)
        }
    } catch (error) {
        console.error(error)
    }
    }
}




