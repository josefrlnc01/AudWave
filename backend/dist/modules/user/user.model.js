import mongoose, { Schema } from 'mongoose';
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
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    }
});
const User = mongoose.model('User', userSchema);
export default User;
