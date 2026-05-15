import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    
    const isAdmin = localStorage.getItem("isAdmin") === "true" || localStorage.getItem("isAdmin") === true;
    console.log("Is this user Admin?:", isAdmin);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products");
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(`http://localhost:5000/api/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert("Product Deleted! 🗑️");
                fetchProducts(); 
            } catch (err) {
                alert("Action failed! Admin access required.");
            }
        }
    };

    
    const handleBuy = async (product) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return alert("Please login first!");
            
            await axios.post("http://localhost:5000/api/orders", 
                { productName: product.name, price: product.price, productId: product._id }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Order Placed Successfully! ✅");
        } catch (err) {
            alert("Order Failed!");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 fw-bold">
                {isAdmin ? "Product Management (Admin Mode)" : "Available Agri Products"}
            </h2>
            <div className="row">
                {products.map((product) => (
                    <div className="col-md-4 mb-4" key={product._id}>
                        <div className="card h-100 shadow-sm border-0">
                            <img 
                                src={product.imageUrl} 
                                className="card-img-top" 
                                style={{ height: "200px", objectFit: "cover" }} 
                                alt={product.name} 
                            />
                            <div className="card-body">
                                <h5 className="card-title fw-bold text-dark">{product.name}</h5>
                                <h4 className="text-primary mb-3">Rs. {product.price}.00</h4>

                            
                                {isAdmin ? (
                                    <div className="d-flex gap-2">
                                        <button 
                                            className="btn btn-warning w-100 fw-bold" 
                                            onClick={() => alert("Update functionality - You can navigate to an update form here.")}
                                        >
                                            Update Price
                                        </button>
                                        <button 
                                            className="btn btn-danger w-100 fw-bold" 
                                            onClick={() => handleDelete(product._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ) : (
                                    <button 
                                        className="btn btn-success w-100 fw-bold shadow-sm" 
                                        onClick={() => handleBuy(product)}
                                    >
                                        Buy Now
                                    </button>
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