import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({ name: "", price: "", imageUrl: "" });

    
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            
            const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
            
            
            await axios.put(`http://localhost:5000/api/products/${id}`, product, config);
            
            alert("Product Updated Successfully! ✅");
            navigate("/view-products");
        } catch (err) {
            alert("Update Failed! Check your Backend.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center text-success fw-bold">Edit Product</h2>
            <form onSubmit={handleUpdate} className="card p-4 shadow border-0">
                <div className="mb-3">
                    <label className="fw-bold">Product Name</label>
                    <input type="text" name="name" className="form-control" value={product.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="fw-bold">Price (Rs.)</label>
                    <input type="number" name="price" className="form-control" value={product.price} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="fw-bold">Image URL</label>
                    <input type="text" name="imageUrl" className="form-control" value={product.imageUrl} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-success w-100 fw-bold">Update Product Now</button>
            </form>
        </div>
    );
};

export default UpdateProduct;