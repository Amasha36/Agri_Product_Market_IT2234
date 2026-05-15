const express = require('express');
const router = express.Router();
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');



router.post('/', protect, admin, createProduct);


router.get('/', getProducts);
router.put('/:id', protect, admin, updateProduct);   
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;