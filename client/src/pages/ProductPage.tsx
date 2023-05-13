import Layout from '../components/Layout';
import ProductDetail from '../components/products/ProductDetail';
import { useAuth } from '../hooks/login/useAuthContext';
import { useCart } from '../hooks/cart/useCartContext';
import useProductDetail from '../hooks/products/useProductDetail';
import { useCallback } from 'react';

const ProductPage = () => {
    const { product, loading } = useProductDetail();
    const { addToCart } = useCart();
    const { isLoggedIn, isSuperUser } = useAuth();

    const handleAddToCart = useCallback(() => {
        if (product) {
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                description: product.description,
                quantity: 1,
            });
        }
    }, [addToCart, product]);

    return (
        <Layout>
            <ProductDetail
                product={product}
                loading={loading}
                handleAddToCart={handleAddToCart}
                isLoggedIn={isLoggedIn}
                isSuperUser={isSuperUser}
            />
        </Layout>
    );
};

export default ProductPage;
