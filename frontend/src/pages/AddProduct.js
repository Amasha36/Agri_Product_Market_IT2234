import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/products", { name, price, imageUrl });
            alert("Product Added! ✅");
        } catch (err) {
            alert("Failed to add product.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center fw-bold">Add New Product</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow mx-auto" style={{maxWidth: '500px'}}>
                <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input type="text" className="form-control" onChange={(e)=>setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input type="number" className="form-control" onChange={(e)=>setPrice(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input type="text" className="form-control" onChange={(e)=>setImageUrl(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Save Product</button>
            </form>
        </div>
    );
};

export default AddProduct;