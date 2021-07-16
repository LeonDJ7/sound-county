import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
    content: { type: String, required: true },
}, {
    timestamps: true
});

export const Message = mongoose.model('Message', MessageSchema, 'messages');