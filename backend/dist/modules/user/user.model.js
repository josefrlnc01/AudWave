import mongoose, { Schema } from 'mongoose';
//Esquema de usuario
export const userSchema = new Schema({
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
    suscription: {
        type: String,
        enum: ['free', 'pro', 'business'],
        default: 'free'
    },
    provider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    },
    confirmed: {
        type: Boolean,
        default: false
    }
});
//Modelo de usuario
const User = mongoose.model('User', userSchema);
export default User;
