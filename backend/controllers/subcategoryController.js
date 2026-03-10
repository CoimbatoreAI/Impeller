const Subcategory = require('../models/Subcategory');

const subcategoryController = {
    create: async (req, res) => {
        try {
            const { name, categoryId, description } = req.body;
            const subcategory = new Subcategory({ name, categoryId, description });
            const savedSubcategory = await subcategory.save();
            res.status(201).json(savedSubcategory);
        } catch (err) {
            res.status(400).json({ message: 'Error creating subcategory', error: err.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const subcategories = await Subcategory.find().populate('categoryId', 'name');
            res.status(200).json(subcategories);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching subcategories', error: err.message });
        }
    },

    getByCategory: async (req, res) => {
        try {
            const subcategories = await Subcategory.find({ categoryId: req.params.categoryId });
            res.status(200).json(subcategories);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching subcategories', error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const { name, categoryId, description } = req.body;
            const subcategory = await Subcategory.findByIdAndUpdate(
                req.params.id,
                { name, categoryId, description },
                { new: true }
            );
            if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });
            res.status(200).json(subcategory);
        } catch (err) {
            res.status(400).json({ message: 'Error updating subcategory', error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const subcategory = await Subcategory.findByIdAndDelete(req.params.id);
            if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });
            res.status(200).json({ message: 'Subcategory deleted' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting subcategory', error: err.message });
        }
    }
};

module.exports = subcategoryController;
