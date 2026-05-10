import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");

    const handleLogout = () => {
        localStorage.clear(); 
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow mb-4">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/view-products">Agri Market</Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav ms-auto align-items-center">
                        <Link className="nav-link text-white" to="/view-products">Products</Link>
                        
                      
                        {role && (
                            <Link className="nav-link text-white" to="/orders">My Orders</Link>
                        )}

                        
                        {role === 'admin' && (
                            <Link className="nav-link btn btn-outline-light btn-sm ms-2 me-2 text-white" to="/add-product">
                                + Add Product
                            </Link>
                        )}

                       
                        {username ? (
                            <>
                                <span className="navbar-text text-warning fw-bold ms-3 me-3">
                                    Hi, {username}
                                </span>
                                <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <Link className="btn btn-light btn-sm" to="/">Login</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;