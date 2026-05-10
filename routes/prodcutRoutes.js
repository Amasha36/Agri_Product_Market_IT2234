const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const Product = require('../models/Product');


router.post('/', protect, admin, async (req, res) => {
    try {
        const { productName, price } = req.body;
        const newProduct = new Product({ productName, price });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;