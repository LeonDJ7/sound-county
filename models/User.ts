import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true},
    image_url: { type: String, required: true},
    access_token: { type: String, required: true },
    refresh_token: { type: Number, required: true },
}, {
    timestamps: true
});

export const User = mongoose.model('User', UserSchema, 'users');

