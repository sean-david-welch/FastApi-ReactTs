import Loading from './components/Loading';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { useEffect, Suspense, lazy } from 'react';

export default function AppRoutes() {
    const Home = lazy(() => import('./pages/Home'));
    const About = lazy(() => import('./pages/About'));
    const Shop = lazy(() => import('./pages/Shop'));
    const Cart = lazy(() => import('./pages/Cart'));
    const Shipping = lazy(() => import('./pages/Shipping'));
    const Checkout = lazy(() => import('./pages/Checkout'));
    const Login = lazy(() => import('./pages/LoginPage'));
    const Success = lazy(() => import('./pages/Success'));
    const ProductPage = lazy(() => import('./pages/ProductPage'));
    const ProductFormPage = lazy(() => import('./pages/ProductFormPage'));
    const CheckoutSuccess = lazy(() => import('./pages/CheckoutSuccess'));
    const CheckoutCancled = lazy(() => import('./pages/CheckoutCancel'));

    const ScrollToTopPage = () => {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

        return null;
    };

    return (
        <CartProvider>
            <ScrollToTopPage />
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route
                        path="/checkout/shipping-details"
                        element={<Shipping />}
                    />
                    <Route
                        path="/checkout/payment-details"
                        element={<Checkout />}
                    />
                    <Route path="/payment-success" element={<Success />} />
                    <Route
                        path="/checkout/success"
                        element={<CheckoutSuccess />}
                    />
                    <Route
                        path="/checkout/canceled"
                        element={<CheckoutCancled />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/product/:productId"
                        element={<ProductPage />}
                    />
                    <Route path="/product-form" element={<ProductFormPage />} />
                </Routes>
            </Suspense>
        </CartProvider>
    );
}
