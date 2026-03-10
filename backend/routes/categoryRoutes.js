const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/', categoryController.getAll);
router.post('/', authMiddleware, upload.single('image'), categoryController.create);
router.put('/:id', authMiddleware, upload.single('image'), categoryController.update);
router.delete('/:id', authMiddleware, categoryController.delete);

module.exports = router;
