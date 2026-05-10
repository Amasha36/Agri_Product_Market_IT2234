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
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("username", res.data.username);

            alert("Login Successful!");
            
            
            if (res.data.role === 'admin') {
                navigate("/add-product");
            } else {
                navigate("/view-products");
            }
        } catch (err) {
            alert("Invalid Credentials!");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4 card p-4 shadow">
                    <h2 className="text-center text-primary">Agri Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label>Username</label>
                            <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button className="btn btn-primary w-100">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;