import mongoose, { Types, Schema } from "mongoose";
//Esquema de videos/audios del dispositivo del usuario
const fileSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    fileId: {
        type: String,
        required: true,
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
    translatedFile: {
        type: String,
        required: false
    },
    origin: {
        type: String,
        default: 'file'
    },
    user: {
        type: Types.ObjectId,
        ref: 'User'
    }
});
//Modelo de video/audio del usuario
const FileModel = mongoose.model('File', fileSchema);
export default FileModel;
