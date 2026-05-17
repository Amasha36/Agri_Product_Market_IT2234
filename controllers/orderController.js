const Order = require('../models/Order');


const createOrder = async (req, res) => {
    try {
        const { productName, price, productId } = req.body;
        const newOrder = new Order({
            user: req.user.id,  
            productName,
            price,
            productId,
            status: 'Pending'
        });
        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getOrders = async (req, res) => {
    try {
        let orders;
        if (req.user.role === 'admin') {
            orders = await Order.find().sort({ createdAt: -1 });
        } else {
            orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        }
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createOrder, getOrders, updateOrderStatus };
