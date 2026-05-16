import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [product, setProduct] = useState({
        name: "",
        price: "",
        imageUrl: ""
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error("දත්ත ලබාගැනීම අසාර්ථකයි:", err);
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
            // මෙතන URL එක backend එකේ route එකට සමාන විය යුතුයි
            await axios.put(`http://localhost:5000/api/products/${id}`, product);
            alert("නිෂ්පාදනය සාර්ථකව Update වුණා! ✅");
            navigate("/view-products");
        } catch (err) {
            console.error("Update Error:", err.response ? err.response.data : err.message);
            alert("Update Failed! Backend URL හෝ Route එක පරීක්ෂා කරන්න.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 card p-4 shadow border-0 rounded-4">
                    <h2 className="text-center fw-bold mb-4 text-success">Edit Product</h2>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                            <label className="fw-bold">Product Name</label>
                            <input type="text" name="name" className="form-control" value={product.name} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="fw-bold">Price (Rs.)</label>
                            <input type="number" name="price" className="form-control" value={product.price} onChange={handleChange} required />
                        </div>
                        <div className="mb-4">
                            <label className="fw-bold">Image URL</label>
                            <input type="text" name="imageUrl" className="form-control" value={product.imageUrl} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-success w-100 fw-bold py-2">Update Product Now</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;