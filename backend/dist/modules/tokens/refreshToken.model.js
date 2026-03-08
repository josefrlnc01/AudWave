import mongoose, { Schema, Types } from "mongoose";
const refreshTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
});
const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
export default RefreshToken;
