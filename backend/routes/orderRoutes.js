const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, orderController.getAll);
router.get('/:id', authMiddleware, orderController.getById);
router.post('/', orderController.create); // Customer can create
router.put('/:id/status', authMiddleware, orderController.updateStatus);
router.delete('/:id', authMiddleware, orderController.delete);

module.exports = router;
