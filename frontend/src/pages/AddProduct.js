import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
            await axios.post("http://localhost:5000/api/products", { name, price, imageUrl }, config);
            alert("Product Added Successfully! ✅");
            navigate('/view-products');
        } catch (err) {
            alert("Failed to add product!");
        }
    };

    return (
        <div className="container mt-5">
            <div className="col-md-6 mx-auto card p-4 shadow border-0">
                <h2 className="text-center fw-bold text-success mb-4">ADD NEW PRODUCT</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Product Name" className="form-control mb-3" onChange={(e) => setName(e.target.value)} required />
                    <input type="number" placeholder="Price" className="form-control mb-3" onChange={(e) => setPrice(e.target.value)} required />
                    <input type="text" placeholder="Image URL (Link)" className="form-control mb-3" onChange={(e) => setImageUrl(e.target.value)} required />
                    <button className="btn btn-dark w-100 fw-bold">PUBLISH PRODUCT</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;