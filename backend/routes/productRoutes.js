const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', authMiddleware, upload.array('images', 5), productController.create);
router.put('/:id', authMiddleware, upload.array('images', 5), productController.update);
router.delete('/:id', authMiddleware, productController.delete);

module.exports = router;
