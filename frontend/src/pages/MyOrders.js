import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const isAdmin = localStorage.getItem("role") === "admin";  

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");  
            const res = await axios.get("http://localhost:5000/api/orders", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(res.data);
        } catch (err) {
            console.error("Failed to fetch orders:", err);
        }
    };

    useEffect(() => { fetchOrders(); }, []);

    const updateStatus = async (id, status) => {
        try {
            const token = localStorage.getItem("token");  
            await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Status Updated!");
            fetchOrders();
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Orders Dashboard</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Status</th>
                        {isAdmin && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {orders.map(o => (
                        <tr key={o._id}>
                            <td>{o.productName}</td>
                            <td>{o.price}</td>
                            <td><span className="badge bg-info">{o.status}</span></td>
                            {isAdmin && (
                                <td>
                                    <select className="form-select" onChange={(e) => updateStatus(o._id, e.target.value)} value={o.status}>
                                        <option value="Pending">Pending</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyOrders;
