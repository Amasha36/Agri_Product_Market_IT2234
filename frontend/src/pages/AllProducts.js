import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const isAdmin = localStorage.getItem("isAdmin") === "true" || localStorage.getItem("role") === "admin";

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products");
                setProducts(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Delete this product?")) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(`http://localhost:5000/api/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert("Deleted! 🗑️");
                window.location.reload();
            } catch (err) {
                alert("Fail!");
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 fw-bold">{isAdmin ? "Manage Products" : "Available Products"}</h2>
            <div className="row">
                {products.map((product) => (
                    <div className="col-md-4 mb-4" key={product._id}>
                        <div className="card h-100 shadow-sm border-0">
                            <img src={product.imageUrl} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} alt={product.name} />
                            <div className="card-body text-center">
                                <h5 className="card-title fw-bold">{product.name}</h5>
                                <h4 className="text-success mb-3">Rs. {product.price}</h4>

                                {isAdmin ? (
                                    <div className="d-grid gap-2">
                                        <button className="btn btn-warning fw-bold">Update</button>
                                        <button className="btn btn-danger fw-bold" onClick={() => handleDelete(product._id)}>Delete</button>
                                    </div>
                                ) : (
                                    <button className="btn btn-success w-100 fw-bold shadow-sm">Buy Now</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;