const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();
const app=express();
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Agriculture Product Marketplace");
}
);

app.use('/api/products', require('./routes/productRoutes'));
const PORT=process.env.PORT||5000;
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("MongoDB connected successfully");
    app.listen(PORT,()=>console.log('Server running on port ${PORT}'));
}
)
.catch(err=>console.log("Database connection error:",err));