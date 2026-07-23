import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    mediaType: {
        type: String,
        enum: ['image', 'video'],
        required: true
    },
    mediaUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['domestic', 'international', 'customer-memories'],
        required: true
    },
    thumbnail: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;