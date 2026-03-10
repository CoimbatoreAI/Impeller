const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/', galleryController.getAll);
router.post('/', authMiddleware, upload.single('image'), galleryController.create);
router.delete('/:id', authMiddleware, galleryController.delete);

module.exports = router;
