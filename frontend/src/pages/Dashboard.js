import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="container mt-5 text-center">
            <h1 className="text-success fw-bold">Admin Dashboard</h1>
            <div className="mt-4">
                <Link to="/add-product" className="btn btn-primary me-3">Add New Product</Link>
                <Link to="/view-products" className="btn btn-secondary">View All Products</Link>
            </div>
        </div>
    );
};

export default Dashboard;