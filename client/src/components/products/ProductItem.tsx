import { useRef } from 'react';
import { Product } from '../../types/ProductTypes';
import { useCart } from '../../hooks/cart/useCartContext';
import { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import NavButton from '../navigation/NavButton';
import useIntersectionObserver from '../../hooks/navigation/useIntersectionObserver';

const ProductItem: React.FC<{ product: Product }> = ({ product }) => {
    const productCardRef = useRef<HTMLLIElement>(null);
    useIntersectionObserver(productCardRef);

    const { addToCart } = useCart();
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
        <li key={product.id} className="hidden" ref={productCardRef}>
            <div className="product-card">
                <h2>{product.name}</h2>
                <img src={product.image} alt={product.name} />
                <h2>Price: €{product.price}</h2>

                <ul className="product-nav">
                    <NavButton
                        to={`/product/${product.id}`}
                        icon={<FontAwesomeIcon icon={faArrowRight} />}
                        label="View Product"
                    />

                    <NavButton
                        to="/cart"
                        icon={<FontAwesomeIcon icon={faCartPlus} />}
                        label="Add to Cart"
                        onClick={handleAddToCart}
                    />
                </ul>
            </div>
        </li>
    );
};

export default ProductItem;
