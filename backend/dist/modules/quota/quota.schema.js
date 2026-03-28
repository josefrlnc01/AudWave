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
    usedMinutes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '30d'
    }
}, { timestamps: false });
quotaSchema.index({ user: 1, ip: 1 }, { unique: true });
const Quota = mongoose.model('Quota', quotaSchema);
export default Quota;
