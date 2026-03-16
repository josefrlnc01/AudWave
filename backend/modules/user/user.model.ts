import mongoose, {Schema, Document} from 'mongoose'

export interface IUser extends Document {
    name: string,
    email: string,
    password: string | null,
    confirmed: boolean
}

//Esquema de usuario
export const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    confirmed: {
        type: Boolean,
        default: false
    }
})

//Modelo de usuario
const User = mongoose.model<IUser>('User', userSchema)

export default User