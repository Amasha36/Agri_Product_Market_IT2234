import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/users/login", { username, password });
            
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("role", res.data.role);
            
            // Admin ද කියලා අනිවාර්යයෙන්ම String එකක් විදිහට save කරනවා
            localStorage.setItem("isAdmin", String(res.data.isAdmin)); 

            alert("Login Successful! 🚀");

            if (res.data.isAdmin === true || res.data.role === 'admin') {
                navigate("/add-product"); // Admin ව කෙලින්ම Add Product එකට යවනවා
            } else {
                navigate("/view-products"); // User ව විතරක් Products වලට යවනවා
            }
            window.location.reload(); 
        } catch (err) {
            alert("Invalid Credentials! ❌");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4 card p-4 shadow border-0 rounded-3">
                    <h2 className="text-center text-success fw-bold mb-4">Agri Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="fw-bold">Username</label>
                            <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label className="fw-bold">Password</label>
                            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button className="btn btn-success w-100 fw-bold">Login Now</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;