import React, { useRef } from 'react';
import { Product } from '../../types/Types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from '../../hooks/cart/useCartContext';
import { useCallback } from 'react';

import NavButton from '../navigation/NavButton';
import useIntersectionObserver from '../../hooks/navigation/useIntersectionObserver';

const ProductItem: React.FC<{ product: Product }> = ({ product }) => {
    const productCardRef = useRef<HTMLDivElement>(null);
    useIntersectionObserver(productCardRef);

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

    return (
        <li key={product.id}>
            <div ref={productCardRef} className="product-card hidden">
                <h2>{product.name}</h2>
                <img src={product.image} alt={product.name} />
                <h2>Price: €{product.price}</h2>

                <ul className="product-nav">
                    <NavButton
                        to={`/product/${product.id}`}
                        icon={<FontAwesomeIcon icon={faArrowRight} />}
                    >
                        View Product
                    </NavButton>
                    <NavButton
                        to="/cart"
                        icon={<FontAwesomeIcon icon={faCartPlus} />}
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </NavButton>
                </ul>
            </div>
        </li>
    );
};

export default ProductItem;
