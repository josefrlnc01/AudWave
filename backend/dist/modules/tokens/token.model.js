import mongoose, { Schema, Types } from 'mongoose';
const tokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: '10m'
    }
});
const Token = mongoose.model('Token', tokenSchema);
export default Token;
