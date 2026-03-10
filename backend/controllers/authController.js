const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mailService = require('../services/mailService');

const authController = {
    // Login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );

            res.status(200).json({
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                    wishlist: user.wishlist,
                    cart: user.cart
                }
            });
        } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err.message });
        }
    },

    // (Optional) Register an initial admin user if needed
    register: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if user exists
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const user = new User({ email, password });
            await user.save();

            // Send welcome email
            mailService.sendWelcomeEmail(email);

            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err.message });
        }
    },

    // Get current user profile
    getMe: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err.message });
        }
    },

    // Update wishlist
    updateWishlist: async (req, res) => {
        try {
            const { wishlist } = req.body;
            const user = await User.findByIdAndUpdate(
                req.user.id,
                { wishlist },
                { new: true }
            ).select('-password');
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err.message });
        }
    },

    // Update cart
    updateCart: async (req, res) => {
        try {
            const { cart } = req.body;
            const user = await User.findByIdAndUpdate(
                req.user.id,
                { cart },
                { new: true }
            ).select('-password');
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err.message });
        }
    }
};

module.exports = authController;
