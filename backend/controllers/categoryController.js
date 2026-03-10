const Category = require('../models/Category');

const categoryController = {
    create: async (req, res) => {
        try {
            const { name, description } = req.body;
            const image = req.file ? `/uploads/${req.file.filename}` : null;
            const category = new Category({ name, description, image });
            const savedCategory = await category.save();
            res.status(201).json(savedCategory);
        } catch (err) {
            res.status(400).json({ message: 'Error creating category', error: err.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const categories = await Category.find();
            res.status(200).json(categories);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching categories', error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const { name, description } = req.body;
            const updateData = { name, description };
            if (req.file) {
                updateData.image = `/uploads/${req.file.filename}`;
            }

            const category = await Category.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true }
            );
            if (!category) return res.status(404).json({ message: 'Category not found' });
            res.status(200).json(category);
        } catch (err) {
            res.status(400).json({ message: 'Error updating category', error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const category = await Category.findByIdAndDelete(req.params.id);
            if (!category) return res.status(404).json({ message: 'Category not found' });
            res.status(200).json({ message: 'Category deleted' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting category', error: err.message });
        }
    }
};

module.exports = categoryController;
