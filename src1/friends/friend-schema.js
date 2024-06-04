// friend.model.js
import mongoose from 'mongoose';

export const friendSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: [ 'accepted', 'rejected','pending'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});