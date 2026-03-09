import mongoose, { Schema, Types } from "mongoose";
const videoStoredSchema = new Schema({
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
});
videoStoredSchema.index({ id: 1, videoId: 1 }, { unique: true });
const VideoStored = mongoose.model('VideoStored', videoStoredSchema);
export default VideoStored;
