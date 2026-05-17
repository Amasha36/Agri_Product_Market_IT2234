import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            
            const { data } = await axios.post("http://localhost:5000/api/users/login", {
                username, password
            });

            
            localStorage.setItem('userInfo', JSON.stringify(data));
            localStorage.setItem('token',    data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('role',     data.role);

            alert("Login Successful!");
            navigate('/view-products');
        } catch (err) {
            alert("Invalid Username or Password!");
        }
    };

    if (!role) {
        return (
            <div className="container vh-100 d-flex justify-content-center align-items-center">
                <div className="text-center p-5 shadow-lg rounded bg-white border border-success">
                    <h2 className="fw-bold mb-4 text-success">WELCOME TO AGRI MARKET</h2>
                    <div className="d-grid gap-3">
                        <button className="btn btn-success btn-lg fw-bold" onClick={() => setRole('user')}>👤 I AM A USER</button>
                        <button className="btn btn-dark btn-lg fw-bold" onClick={() => setRole('admin')}>👨‍✈️ I AM AGRI-ADMIN</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5 card p-4 shadow-lg border-0">
                    <h3 className="text-center mb-4 fw-bold text-uppercase">{role} Login</h3>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="fw-bold">Username</label>
                            <input type="text" className="form-control" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="fw-bold">Password</label>
                            <input type="password" className="form-control" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className={`btn w-100 fw-bold ${role === 'admin' ? 'btn-dark' : 'btn-success'}`}>LOGIN NOW</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
