import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: { type: String },
    access_token: { type: String, required: true },
    refresh_token: { type: Number, required: true },
}, {
    timestamps: true
});

export const User = mongoose.model('User', UserSchema, 'users');

