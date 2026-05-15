import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem("username") === "agriadmin";

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Do you want to delete?")) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${id}`);
                alert("Deleted! 🗑️");
                setProducts(products.filter(p => p._id !== id));
            } catch (err) { alert("Fail!"); }
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4 fw-bold text-dark">{isAdmin ? "Manage Inventory" : "Fresh Harvest"}</h2>
            <div className="row">
                {products.map((product) => (
                    <div className="col-md-4 mb-4" key={product._id}>
                        <div className="card h-100 shadow-sm border-0 rounded-3">
                            <img src={product.imageUrl} className="card-img-top" style={{height:'200px', objectFit:'cover'}} alt="" />
                            <div className="card-body text-center">
                                <h5 className="fw-bold">{product.name}</h5>
                                <h4 className="text-success fw-bold">Rs. {product.price}</h4>
                                <hr />
                                {isAdmin ? (
                                    <div className="d-grid gap-2">
                                        <button className="btn btn-warning fw-bold" onClick={() => navigate(`/update-product/${product._id}`)}>Update</button>
                                        <button className="btn btn-danger fw-bold" onClick={() => handleDelete(product._id)}>Delete</button>
                                    </div>
                                ) : (
                                    <button className="btn btn-success w-100 fw-bold" onClick={() => alert("Order Placed! ✅")}>Buy Now</button>
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