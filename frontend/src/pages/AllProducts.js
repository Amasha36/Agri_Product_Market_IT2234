import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    {/* Taking products from backend*/}
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products");
                setProducts(res.data);
            } catch (err) {
                console.error("Error fetching products", err);
            }
        };
        fetchProducts();
    }, []);

    // {/*Order Function*/} 
    const handleBuy = async (product) => {
        const token = localStorage.getItem("token"); 
        
        if (!token) {
            alert("Please login to buy products!");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/orders", {
                productName: product.productName,
                price: product.price
            }, {
                headers: { 
                    Authorization: `Bearer ${token}` 
                }
            });
            alert(`✅ Order placed successfully for ${product.productName}!`);
        } catch (err) {
            console.error("Order Error:", err.response?.data);
            alert("❌ Failed to place order.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-success">Available Agri Products</h2>
            <hr />
            <div className="row">
                {products.map((product) => (
                    <div className="col-md-4 mb-4" key={product._id}>
                        <div className="card shadow-sm h-100 border-success">
                            <div className="card-body text-center">
                                <h5 className="card-title text-dark">{product.productName}</h5>
                                <p className="card-text fw-bold text-muted">Price: Rs. {product.price}</p>
                                
                                {/* 3. Buy Now Button එක */}
                                <button 
                                    onClick={() => handleBuy(product)} 
                                    className="btn btn-outline-success w-100 fw-bold"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* When the data isn't available */}
            {products.length === 0 && (
                <div className="text-center mt-5">
                    <p className="lead text-muted">No products found in the market.</p>
                </div>
            )}
        </div>
    );
};

export default AllProducts;