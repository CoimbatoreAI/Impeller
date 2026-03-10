const Product = require('../models/Product');

const productController = {
    create: async (req, res) => {
        try {
            const { name, description, price, categoryId, subcategoryId, stock, isAvailable } = req.body;
            const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

            const product = new Product({
                name,
                description,
                price,
                categoryId,
                subcategoryId,
                stock,
                isAvailable,
                images,
                mainImage: images.length > 0 ? images[0] : null
            });

            const savedProduct = await product.save();
            res.status(201).json(savedProduct);
        } catch (err) {
            res.status(400).json({ message: 'Error creating product', error: err.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const products = await Product.find()
                .populate('categoryId', 'name')
                .populate('subcategoryId', 'name');
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching products', error: err.message });
        }
    },

    getById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id)
                .populate('categoryId', 'name')
                .populate('subcategoryId', 'name');
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching product', error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const { name, description, price, categoryId, subcategoryId, stock, isAvailable, existingImages } = req.body;
            let images = [];
            if (existingImages) {
                images = Array.isArray(existingImages) ? existingImages : [existingImages];
            }

            if (req.files && req.files.length > 0) {
                const newImages = req.files.map(file => `/uploads/${file.filename}`);
                images = [...images, ...newImages];
            }

            const product = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    name,
                    description,
                    price,
                    categoryId,
                    subcategoryId,
                    stock,
                    isAvailable,
                    images,
                    mainImage: images.length > 0 ? images[0] : null
                },
                { new: true }
            );

            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.status(200).json(product);
        } catch (err) {
            res.status(400).json({ message: 'Error updating product', error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.status(200).json({ message: 'Product deleted' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting product', error: err.message });
        }
    }
};

module.exports = productController;
