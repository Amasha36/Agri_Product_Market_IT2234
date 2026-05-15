import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import AllProducts from './pages/AllProducts';
import AddProduct from './pages/AddProduct'; // ඔබ සාදා ඇති Add Product component එකේ නම පාවිච්චි කරන්න

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* මුලින්ම ලොග් නොවී ඇත්නම් Login පිටුවට යොමු කරයි */}
        <Route path="/" element={<Navigate to="/view-products" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/view-products" element={<AllProducts />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;