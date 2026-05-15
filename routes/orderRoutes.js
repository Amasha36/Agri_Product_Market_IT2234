const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, createOrder); // 
router.get('/', protect, getOrders);    // 
router.put('/:id/status', protect, admin, updateOrderStatus); // Admin

module.exports = router;