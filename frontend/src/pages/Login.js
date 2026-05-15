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

            alert("Login Successful! 🚀");

            if (res.data.username === "agriadmin") {
                navigate("/add-product");
            } else {
                navigate("/view-products");
            }
            window.location.reload(); 
        } catch (err) {
            alert("Attempt isn't successful!! Try again");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-sm border-0 mx-auto" style={{maxWidth: '400px', borderRadius: '15px'}}>
                <h3 className="text-center text-success fw-bold mb-4">Agri Login</h3>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <input type="text" placeholder="Username" className="form-control" onChange={(e)=>setUsername(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" placeholder="Password" className="form-control" onChange={(e)=>setPassword(e.target.value)} required />
                    </div>
                    <button className="btn btn-success w-100 fw-bold py-2 shadow-sm">Login Now</button>
                </form>
            </div>
        </div>
    );
};

export default Login;