const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');
const authMiddleware = require('../middlewares/auth');

router.get('/', subcategoryController.getAll);
router.get('/category/:categoryId', subcategoryController.getByCategory);
router.post('/', authMiddleware, subcategoryController.create);
router.put('/:id', authMiddleware, subcategoryController.update);
router.delete('/:id', authMiddleware, subcategoryController.delete);

module.exports = router;
