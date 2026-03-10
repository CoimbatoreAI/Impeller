const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    image: {
        type: String // URL or path to the image
    }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
