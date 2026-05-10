import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/orders", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(res.data);
            } catch (err) {
                console.error("Error fetching orders", err);
            }
        };
        fetchOrders();
    }, [token]);

    return (
        <div className="container mt-5">
            <h2 className="text-primary mb-4">Orders Dashboard</h2>
            <table className="table table-hover shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>Product Name</th>
                        <th>Price (Rs.)</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order.productName}</td>
                            <td>{order.price}</td>
                            <td><span className="badge bg-warning text-dark">{order.status}</span></td>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {orders.length === 0 && <p className="text-center">No orders found.</p>}
        </div>
    );
};

export default MyOrders;