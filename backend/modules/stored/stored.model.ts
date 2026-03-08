import mongoose, {Document, Schema, Types} from "mongoose";


interface IVideoStored extends Document {
    videoId: string,
    title: string,
    text: string,
    user: Types.ObjectId
}


const videoStoredSchema: Schema = new Schema({
    videoId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true 
    }
})


const VideoStored = mongoose.model<IVideoStored>('VideoStored', videoStoredSchema)

export default VideoStored