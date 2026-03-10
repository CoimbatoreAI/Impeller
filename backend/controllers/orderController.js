const Order = require('../models/Order');
const mailService = require('../services/mailService');

const orderController = {
    create: async (req, res) => {
        try {
            const { customerDetails, products, totalAmount, customerName, customerEmail, customerPhone, shippingAddress, city, zipCode } = req.body;
            const orderNumber = 'ORD-' + Date.now();

            // Handle both nested and flat customer details
            const finalCustomerDetails = customerDetails || {
                name: customerName,
                email: customerEmail,
                phone: customerPhone,
                address: `${shippingAddress}, ${city} - ${zipCode}`
            };

            const order = new Order({
                orderNumber,
                customerDetails: finalCustomerDetails,
                products,
                totalAmount
            });

            const savedOrder = await order.save();

            // Send order confirmation emails
            mailService.sendOrderConfirmation(savedOrder);

            res.status(201).json(savedOrder);
        } catch (err) {
            res.status(400).json({ message: 'Error creating order', error: err.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const orders = await Order.find().sort({ createdAt: -1 });
            res.status(200).json(orders);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching orders', error: err.message });
        }
    },

    getById: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id);
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.status(200).json(order);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching order', error: err.message });
        }
    },

    updateStatus: async (req, res) => {
        try {
            const { status, paymentStatus } = req.body;
            const order = await Order.findByIdAndUpdate(
                req.params.id,
                { status, paymentStatus },
                { new: true }
            );
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.status(200).json(order);
        } catch (err) {
            res.status(400).json({ message: 'Error updating order status', error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const order = await Order.findByIdAndDelete(req.params.id);
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.status(200).json({ message: 'Order deleted' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting order', error: err.message });
        }
    }
};

module.exports = orderController;
