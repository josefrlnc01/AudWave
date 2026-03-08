import { IUser } from "../user/user.model.js";
import VideoStored, { IVideoStored } from "./stored.model.js";

type InsertProps = {
    videoId: string,
        title: string,
        text: string,
        user: IUser
}
export async function insert ({videoId, title, text, user}: InsertProps) {
    try {
        const videoExists = await VideoStored.findById(user._id)
    console.log(videoExists)
    if (videoExists) {
        throw new Error('Este video ya está guardado')
    }

    const video = new VideoStored()
    video.videoId = videoId
    video.title = title
    video.text = text
    video.user = user._id
    await video.save()
    return true
    } catch {
        return false
    }
}