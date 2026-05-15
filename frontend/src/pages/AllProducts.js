import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Fetch the data
    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products");
            setProducts(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching products", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // 2. For buying (User)
    const handleBuy = async (product) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login to buy products");
                return;
            }
            
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const orderData = {
                productId: product._id,
                productName: product.name,
                price: product.price
            };

            await axios.post("http://localhost:5000/api/orders", orderData, config);
            alert(`Successfully ordered: ${product.name} ✅`);
        } catch (err) {
            alert("Order failed. Please try again.");
        }
    };

    // 3.For deleting (Admin)
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const token = localStorage.getItem("token");
                const config = { headers: { Authorization: `Bearer ${token}` } };
                await axios.delete(`http://localhost:5000/api/products/${id}`, config);
                alert("Product deleted! 🗑️");
                fetchProducts(); 
            } catch (err) {
                alert("Delete failed. Admin access required.");
            }
        }
    };

    // 4.Update  Function (Admin)
    const handleUpdate = async (id) => {
        const newPrice = prompt("Enter new price:");
        if (newPrice) {
            try {
                const token = localStorage.getItem("token");
                const config = { headers: { Authorization: `Bearer ${token}` } };
                await axios.put(`http://localhost:5000/api/products/${id}`, { price: newPrice }, config);
                alert("Price updated! 💰");
                fetchProducts();
            } catch (err) {
                alert("Update failed!");
            }
        }
    };

    if (loading) return <div className="text-center mt-5">Loading Products...</div>;

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 fw-bold text-success">Agri Product Market</h2>
            <div className="row">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div className="col-md-4 mb-4" key={product._id}>
                            <div className="card h-100 shadow-sm border-0 rounded-3">
                                <img 
                                    src={product.imageUrl} 
                                    className="card-img-top rounded-top" 
                                    alt={product.name}
                                    style={{ height: "200px", objectFit: "cover" }}
                                    onError={(e) => { e.target.src = "https://via.placeholder.com/200?text=No+Image"; }}
                                />
                                <div className="card-body">
                                    <span className="badge bg-success-subtle text-success mb-2">{product.category}</span>
                                    <h5 className="card-title fw-bold text-dark">{product.name}</h5>
                                    <h4 className="text-primary mb-3">Rs. {product.price}.00</h4>

                                    
                                    {localStorage.getItem("isAdmin") === "true" ? (
                                        <div className="d-flex gap-2">
                                            <button className="btn btn-warning btn-sm w-100 fw-bold" onClick={() => handleUpdate(product._id)}>Update</button>
                                            <button className="btn btn-danger btn-sm w-100 fw-bold" onClick={() => handleDelete(product._id)}>Delete</button>
                                        </div>
                                    ) : (
                                        <button className="btn btn-success w-100 fw-bold shadow-sm" onClick={() => handleBuy(product)}>
                                            Buy Now
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center w-100">No products available at the moment.</div>
                )}
            </div>
        </div>
    );
};

export default AllProducts;