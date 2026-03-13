import mongoose, {Document, Schema, Types} from "mongoose";


export interface IYoutubeVideo extends Document {
    title: string,
    commnent: string | null
    youtubeVideoText: string,
    translatedYoutubeVideo: string
    user: Types.ObjectId
}


const youtubeVideoSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    comment : {
        type: String,
        required:  false
    },
    youtubeVideoText: {
        type: String,
        required: true
    },
    translatedYoutubeVideo: {
        type: String,
        required: false
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true 
    }
})


const YoutubeVideo = mongoose.model<IYoutubeVideo>('YoutubeVideo', youtubeVideoSchema)

export default YoutubeVideo