import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        category: '',
        imageUrl: '' 
    });
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login as Admin first!");
                return;
            }

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            // Send data to the Backend
            await axios.post("http://localhost:5000/api/products", product, config);
            
            alert("Product added successfully! ✅");
            navigate('/dashboard'); 
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Error adding product. Check Backend Console.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-header bg-success text-white text-center py-3">
                            <h4 className="mb-0">Add New Agri Product</h4>
                        </div>
                        <div className="card-body p-4 text-start">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Product Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={product.name}
                                        onChange={(e) => setProduct({...product, name: e.target.value})} 
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Price (Rs.)</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        value={product.price}
                                        onChange={(e) => setProduct({...product, price: e.target.value})} 
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Category</label>
                                    <select 
                                        className="form-select" 
                                        value={product.category}
                                        onChange={(e) => setProduct({...product, category: e.target.value})} 
                                        required
                                    >
                                        <option value="">-- Select Category --</option>
                                        <option value="Vegetables">Vegetables</option>
                                        <option value="Fruits">Fruits</option>
                                        <option value="Grains">Grains</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-bold">Image URL</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={product.imageUrl}
                                        onChange={(e) => setProduct({...product, imageUrl: e.target.value})} 
                                        required 
                                    />
                                </div>

                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-success btn-lg shadow-sm fw-bold">Submit Product</button>
                                    <button type="button" className="btn btn-outline-secondary mt-2" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;