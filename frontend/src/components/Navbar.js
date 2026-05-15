import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    
    
    const isAdmin = username === "agriadmin";

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow mb-4">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/view-products">Agri Market</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/view-products">Products</Link>
                        </li>
                        {isAdmin && (
                            <li className="nav-item">
                                <Link className="nav-link fw-bold text-warning" to="/add-product">+ Add Product</Link>
                            </li>
                        )}
                    </ul>
                    <div className="d-flex align-items-center text-white">
                        {token ? (
                            <>
                                <span className="me-3 font-monospace">User: {username}</span>
                                <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <Link className="btn btn-outline-light btn-sm" to="/login">Login</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;