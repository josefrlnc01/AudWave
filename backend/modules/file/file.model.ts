import mongoose, {Document, Types, Schema} from "mongoose";

interface IFileStored extends Document {
    title: string,
    comment: string | null
    fileText: string | null,
    translatedFile: string | null
    user: Types.ObjectId
}

//Esquema de videos/audios del dispositivo del usuario
const fileSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: false
    },
    fileText: {
        type: String,
        required: false
    },
    translatedFile: {
        type: String,
        required: false
    },
    user: {
        type: Types.ObjectId,
        ref: 'User'
    }
})

//Modelo de video/audio del usuario
const FileModel = mongoose.model<IFileStored>('File', fileSchema)

export default FileModel