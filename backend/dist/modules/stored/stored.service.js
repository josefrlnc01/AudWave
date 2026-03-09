import VideoStored from "./stored.model.js";
export async function insert({ data, user }) {
    try {
        const videoExists = await VideoStored.findOne({
            user: user._id,
            videoId: data.videoId
        });
        if (videoExists) {
            throw new Error('Este video ya está guardado');
        }
        const video = new VideoStored();
        video.videoId = data.videoId;
        video.title = data.title;
        video.text = data.text;
        video.user = user._id;
        await video.save();
    }
    catch (error) {
        console.error(error);
        if (error?.code === 1100) {
            throw new Error('Este video ya está guardado');
        }
        throw new Error('Hubo un error al guardar el vídeo');
    }
}
