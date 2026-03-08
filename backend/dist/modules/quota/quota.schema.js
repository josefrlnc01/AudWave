import mongoose, { Schema, Types } from "mongoose";
const quotaSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    requestCount: {
        type: Number,
        default: 0
    },
    resetAt: {
        type: Date,
        default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
        expires: 0
    }
});
quotaSchema.index({ user: 1, ip: 1 }, { unique: true });
const Quota = mongoose.model('Quota', quotaSchema);
export default Quota;
