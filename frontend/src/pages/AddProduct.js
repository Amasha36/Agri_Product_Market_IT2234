import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    {/*To keep the inputs*/}
    
const role = localStorage.getItem("role");
if (role !== 'admin') {
    return <div className="container mt-5"><h1>Access Denied! Only Admin can access this.</h1></div>;
}
    const [pName, setPName] = useState("");
    const [pPrice, setPPrice] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        {/*Take the token from local storage*/}
        const token = localStorage.getItem("token");

        {/*Data structure relevant for model in backend*/}
        const newProduct = {
            productName: pName,
            price: Number(pPrice)
        };

        try {
            // Data is passing with token throgh axioms
            const response = await axios.post("http://localhost:5000/api/products", newProduct, {
                headers: {
                    Authorization: `Bearer ${token}` // For safety, token is send from here
                }
            });

            if (response.status === 201 || response.status === 200) {
                alert("✅ Product added successfully!");
                setPName("");
                setPPrice("");
            }
        } catch (err) {
            console.error("Submission Error:", err.response?.data);
            
           
            if (err.response?.status === 401 || err.response?.status === 403) {
                alert("❌ Session expired or Not Authorized. Please Login again.");
                navigate("/");
            } else {
                alert("❌ Error: " + (err.response?.data?.message || "Something went wrong"));
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4" style={{ borderRadius: '15px', borderTop: '8px solid #28a745' }}>
                        <h2 className="text-success text-center mb-4">Add New Agri Product</h2>
                        
                        <form onSubmit={handleSubmit}> 
                            <div className="mb-3">
                                <label className="form-label fw-bold">Product Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="e.g. Pumpkin, Leeks"
                                    value={pName}
                                    onChange={(e) => setPName(e.target.value)}
                                    required 
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label fw-bold">Price (Rs.)</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder="Enter price"
                                    value={pPrice}
                                    onChange={(e) => setPPrice(e.target.value)}
                                    required 
                                />
                            </div>
                            
                            <button type="submit" className="btn btn-success w-100 py-2 fw-bold shadow-sm">
                                Submit Product
                            </button>
                        </form>
                        
                        <div className="text-center mt-3">
                            <button className="btn btn-link text-decoration-none" onClick={() => navigate("/")}>
                                ⬅ Back to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;