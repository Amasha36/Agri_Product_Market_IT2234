import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const isAdmin = localStorage.getItem('role') === 'admin';  

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products");
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
                await axios.delete(`http://localhost:5000/api/products/${id}`, config);
                alert("Product deleted successfully! 🗑️");
                fetchProducts();
            } catch (err) {
                alert("Delete failed! Please check the backend.");
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center fw-bold text-success mb-4">AGRI MARKETPLACE</h2>
            <div className="row">
                {products.map((p) => (
                    <div className="col-md-4 mb-4" key={p._id}>
                        <div className="card h-100 shadow border-0 text-center">
                            <img src={p.imageUrl} className="card-img-top" alt={p.name} style={{ height: '180px', objectFit: 'cover' }} />
                            <div className="card-body">
                                <h5 className="card-title fw-bold">{p.name}</h5>
                                <p className="text-muted small">{p.category}</p>
                                <p className="text-success fs-5 fw-bold">Rs. {p.price}.00</p>
                                <div className="d-grid gap-2">
                                    {isAdmin ? (
                                        <>
                                            
                                            <button
                                                className="btn btn-warning fw-bold text-white"
                                                onClick={() => navigate(`/update-product/${p._id}`)}
                                            >
                                                UPDATE PRODUCT
                                            </button>
                                            <button className="btn btn-danger fw-bold" onClick={() => handleDelete(p._id)}>DELETE PRODUCT</button>
                                        </>
                                    ) : (
                                        <button className="btn btn-success fw-bold" onClick={() => setCart([...cart, p])}>BUY NOW</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            
            {!isAdmin && cart.length > 0 && (
                <div className="mt-5 p-4 bg-light border-top border-5 border-success rounded">
                    <h4 className="fw-bold">My Cart ({cart.length} items) 🛒</h4>
                    <ul className="list-group list-group-flush mb-3">
                        {cart.map((item, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between">
                                {item.name} <span>Rs. {item.price}.00</span>
                            </li>
                        ))}
                    </ul>
                    <h5 className="text-end fw-bold">Total: Rs. {cart.reduce((s, i) => s + Number(i.price), 0)}.00</h5>
                </div>
            )}
        </div>
    );
};

export default AllProducts;
