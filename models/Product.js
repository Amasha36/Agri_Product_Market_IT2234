const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
   
    category: { type: String }, 
    quantity: { type: String },
    description: { type: String },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);