const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const { auth, admin } = require('../middlewares/auth');

// Public route to validate coupon
router.post('/validate', couponController.validateCoupon);

// Admin routes
router.post('/', auth, admin, couponController.createCoupon);
router.get('/', auth, admin, couponController.getCoupons);
router.patch('/:id/toggle', auth, admin, couponController.toggleStatus);

module.exports = router;
