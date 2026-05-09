const Product = require('../models/Product');

//  (GET)
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// (POST)
exports.addProduct = async (req, res) => {
    const product = new Product({
        productName: req.body.productName,
        price: req.body.price,
        category: req.body.category,
        quantity: req.body.quantity,
        description: req.body.description
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};