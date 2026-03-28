import mongoose, { Schema, Types } from "mongoose";
//Esquema videos de youtube introducidos por el usuario
const youtubeVideoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    fileId: {
        type: String,
        required: true
    },
    segments: [
        {
            start: { type: Number, required: true },
            end: { type: Number, required: true },
            text: { type: String, required: true }
        }
    ],
    duration: {
        type: String,
        required: false
    },
    translatedYoutubeVideo: {
        type: String,
        required: false
    },
    origin: {
        type: String,
        default: 'youtube'
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
});
//Modelo de videos de youtube
const YoutubeVideo = mongoose.model('YoutubeVideo', youtubeVideoSchema);
export default YoutubeVideo;
