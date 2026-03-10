const Gallery = require('../models/Gallery');

const galleryController = {
    create: async (req, res) => {
        try {
            const { title, category } = req.body;
            if (!req.file) return res.status(400).json({ message: 'Image file is required' });

            const gallery = new Gallery({
                title,
                category,
                image: `/uploads/${req.file.filename}`
            });

            const savedGallery = await gallery.save();
            res.status(201).json(savedGallery);
        } catch (err) {
            res.status(400).json({ message: 'Error creating gallery item', error: err.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const items = await Gallery.find().sort({ createdAt: -1 });
            res.status(200).json(items);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching gallery', error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const item = await Gallery.findByIdAndDelete(req.params.id);
            if (!item) return res.status(404).json({ message: 'Item not found' });
            res.status(202).json({ message: 'Gallery item deleted' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting item', error: err.message });
        }
    }
};

module.exports = galleryController;
