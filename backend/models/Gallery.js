const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String, // e.g., 'Manufacturing', 'Fashion Show', 'Store'
        default: 'General'
    }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
