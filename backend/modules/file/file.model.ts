import mongoose, {Document, Types, Schema} from "mongoose";

interface IFileStored extends Document {
    text: string,
    translated: string | null
    user: Types.ObjectId
}

const fileSchema: Schema = new Schema({
    text: {
        type: String,
        required: true
    },
    translated: {
        type: String,
        required: false
    },
    user: {
        type: Types.ObjectId,
        ref: 'User'
    }
})

const FileModel = mongoose.model<IFileStored>('File', fileSchema)

export default FileModel