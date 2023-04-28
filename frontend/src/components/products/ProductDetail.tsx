import useProductDetail from '../../hooks/products/useProductDetail';
import NavButton from '../navigation/NavButton';
import LoadingSpinner from '../Loading';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from '../../hooks/cart/useCartContext';
import { useCallback } from 'react';

const ProductDetail = () => {
    const { product, loading } = useProductDetail();
    const { addToCart } = useCartContext();

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

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <section id="product-detail">
            <h2 className="section-heading">{product?.name}:</h2>
            <div className="product-detail">
                <img src={product?.image} alt={product?.name} />

                <div className="product-info">
                    <h2>Price: €{product?.price}</h2>
                    <ul className="product-nav">
                        <NavButton
                            to="/cart"
                            icon={<FontAwesomeIcon icon={faCartPlus} />}
                            onClick={handleAddToCart}
                        >
                            Add to Cart - €{product?.price}
                        </NavButton>
                    </ul>
                    <p>{product?.description}</p>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
