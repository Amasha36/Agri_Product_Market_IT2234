import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import AllProducts from './pages/AllProducts';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/view-products" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/view-products" element={<AllProducts />} />
        <Route path="/add-product" element={<AddProduct />} />
        
        
        <Route path="/update-product/:id" element={<UpdateProduct />} />
      </Routes>
    </Router>
  );
}

export default App;