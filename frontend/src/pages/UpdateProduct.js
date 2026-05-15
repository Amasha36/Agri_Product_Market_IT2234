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
                console.error("Fetch Error:", err);
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
           
            await axios.put(`http://localhost:5000/api/products/${id}`, product);
            alert("Product Updated Successfully! ✅");
            navigate("/view-products");
        } catch (err) {
            console.error("Update Error:", err);
            alert("Failed! Please check your Backend URL.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 card p-4 shadow-sm border-0">
                    <h2 className="text-center fw-bold mb-4">Edit Product</h2>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                            <label className="fw-bold">Product Name</label>
                            <input type="text" name="name" className="form-control" value={product.name} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="fw-bold">Price</label>
                            <input type="number" name="price" className="form-control" value={product.price} onChange={handleChange} required />
                        </div>
                        <div className="mb-4">
                            <label className="fw-bold">Image URL</label>
                            <input type="text" name="imageUrl" className="form-control" value={product.imageUrl} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-warning w-100 fw-bold">Update Product Now</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;