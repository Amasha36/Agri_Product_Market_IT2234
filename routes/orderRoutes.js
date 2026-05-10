const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, async (req, res) => {
    try {
        const { productName, price } = req.body;
        const newOrder = new Order({
            user: req.user.id, 
            productName,
            price
        });
        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
{/*For taking all the users*/}
router.get('/', protect, async (req, res) => {
    try {
        let orders;
        if (req.user.role === 'admin') {
            orders = await Order.find().populate('user', 'username');
        } else {
            orders = await Order.find({ user: req.user.id }); 
        }
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;