const express = require('express');
const router = express.Router();
// ඔබගේ Product model එක ඇති තැන නිවැරදිදැයි බලන්න
const Product = require('../models/productModel'); 

// 1. සියලු නිෂ්පාදන ලබා ගැනීම (Manage Inventory සඳහා)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "දත්ත ලබාගැනීම අසාර්ථකයි" });
    }
});

// 2. අලුතින් නිෂ්පාදනයක් එක් කිරීම
router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json({ message: "නිෂ්පාදනය එක් කිරීම අසාර්ථකයි" });
    }
});

// 3. මිල (Price) Update කිරීම - මෙය දැන් කිසිදු බාධාවකින් තොරව ක්‍රියා කරයි
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        if (!updatedProduct) return res.status(404).json("Product not found");
        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json(err);
    }
});

// 4. නිෂ්පාදනයක් මකා දැමීම
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;