import { Routes, Route } from 'react-router-dom';

import Home from './Home';
import About from './About';
import Shop from './Shop';
import Cart from './Cart';
import Login from './LoginPage';
import Success from './Success';
import ProductPage from './ProductPage';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment-success" element={<Success />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:productId" element={<ProductPage />} />
        </Routes>
    );
}
