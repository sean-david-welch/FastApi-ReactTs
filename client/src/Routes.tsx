import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Suspense, lazy } from 'react';
import Loading from './components/Loading';

export default function AppRoutes() {
    const Home = lazy(async () => await import('./pages/Home'));
    const About = lazy(async () => await import('./pages/About'));
    const Shop = lazy(async () => await import('./pages/Shop'));
    const Cart = lazy(async () => await import('./pages/Cart'));
    const Checkout = lazy(async () => await import('./pages/Checkout'));
    const Login = lazy(async () => await import('./pages/LoginPage'));
    const Success = lazy(async () => await import('./pages/Success'));
    const ProductPage = lazy(async () => await import('./pages/ProductPage'));

    return (
        <CartProvider>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/payment-success" element={<Success />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/product/:productId"
                        element={<ProductPage />}
                    />
                </Routes>
            </Suspense>
        </CartProvider>
    );
}
