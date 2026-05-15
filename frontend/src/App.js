import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AddProduct from './pages/AddProduct';
import AllProducts from './pages/AllProducts';
import MyOrders from './pages/MyOrders'; 
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/view-products" element={<AllProducts />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/orders" element={<MyOrders />} />
      </Routes>
    </Router>
  );
}

export default App;