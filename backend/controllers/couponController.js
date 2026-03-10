const Coupon = require('../models/Coupon');

const couponController = {
    // Validate a coupon code
    validateCoupon: async (req, res) => {
        try {
            const { code, cartTotal } = req.body;

            if (!code) {
                return res.status(400).json({ message: 'Coupon code is required' });
            }

            const coupon = await Coupon.findOne({
                code: code.toUpperCase(),
                isActive: true
            });

            if (!coupon) {
                return res.status(404).json({ message: 'Invalid or expired coupon code' });
            }

            // Check expiry
            if (new Date() > coupon.expiryDate) {
                coupon.isActive = false;
                await coupon.save();
                return res.status(400).json({ message: 'Coupon has expired' });
            }

            // Check usage limit
            if (coupon.usedCount >= coupon.usageLimit) {
                coupon.isActive = false;
                await coupon.save();
                return res.status(400).json({ message: 'Coupon usage limit reached' });
            }

            // Check min purchase
            if (cartTotal < coupon.minPurchase) {
                return res.status(400).json({
                    message: `Minimum purchase of ₹${coupon.minPurchase} required for this coupon`
                });
            }

            let discount = 0;
            if (coupon.discountType === 'percentage') {
                discount = (cartTotal * coupon.discountAmount) / 100;
                if (coupon.maxDiscount && discount > coupon.maxDiscount) {
                    discount = coupon.maxDiscount;
                }
            } else {
                discount = coupon.discountAmount;
            }

            res.status(200).json({
                message: 'Coupon applied successfully',
                discount,
                code: coupon.code,
                discountType: coupon.discountType,
                discountAmount: coupon.discountAmount
            });

        } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err.message });
        }
    },

    // Admin: Create coupon
    createCoupon: async (req, res) => {
        try {
            const newCoupon = new Coupon(req.body);
            await newCoupon.save();
            res.status(201).json(newCoupon);
        } catch (err) {
            res.status(500).json({ message: 'Error creating coupon', error: err.message });
        }
    },

    // Admin: Get all coupons
    getCoupons: async (req, res) => {
        try {
            const coupons = await Coupon.find().sort({ createdAt: -1 });
            res.status(200).json(coupons);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching coupons', error: err.message });
        }
    },

    // Admin: Toggle status
    toggleStatus: async (req, res) => {
        try {
            const coupon = await Coupon.findById(req.params.id);
            coupon.isActive = !coupon.isActive;
            await coupon.save();
            res.status(200).json(coupon);
        } catch (err) {
            res.status(500).json({ message: 'Error updating coupon', error: err.message });
        }
    }
};

module.exports = couponController;
