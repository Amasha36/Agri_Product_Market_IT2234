const Product = require('../models/Product');


const createProduct = async (req, res) => {
    console.log("Body contents:", req.body);
    try {
        const { name, price, category, imageUrl } = req.body;

        if (!name || !price || !category || !imageUrl) {
            return res.status(400).json({
                message: `Missing fields: ${!name ? 'name ' : ''}${!price ? 'price ' : ''}${!category ? 'category ' : ''}${!imageUrl ? 'imageUrl' : ''}`
            });
        }

        const newProduct = new Product({ name, price, category, imageUrl });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateProduct = async (req, res) => {
    try {
        const { name, price, category, imageUrl } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, category, imageUrl },
            { new: true }
        );
        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
