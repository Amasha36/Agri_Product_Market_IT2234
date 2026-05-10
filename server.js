const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

app.use('/api/products', require('./routes/prodcutRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

app.get('/', (req, res) => {
    res.send("Agriculture Product Marketplace API is running...");
});


const PORT = process.env.PORT || 5000;


const mongoURI = process.env.MONGO_URL || "mongodb://localhost:27017/agriMarket";

mongoose.connect(mongoURI)
    .then(() => {
        console.log("✅ MongoDB connected successfully!");
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch(err => {
        console.log("❌ Database connection error:", err);
    });