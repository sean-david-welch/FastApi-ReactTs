import useProductDetail from '../../hooks/products/useProductDetail';
import NavButton from '../navigation/NavButton';
import SectionHeading from '../navigation/SectionHeading';
import Loading from '../Loading';

import { useCart } from '../../hooks/cart/useCartContext';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ProductDetail = () => {
    const { product, loading } = useProductDetail();
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

    const navigate = useNavigate();

    const handleUpdateClick = () => {
        navigate('/product-form', { state: { action: 'update', product } });
    };

    if (loading) {
        return (
            <section id="product-detail">
                <Loading />
            </section>
        );
    }

    return (
        <section id="product-detail">
            <SectionHeading
                onClick={handleUpdateClick}
                headingText={`${product ? product.name : ''}`}
                buttonLabel="Update Product"
                buttonUrl="/product-form"
                buttonIcon={
                    <FontAwesomeIcon icon={faArrowRight} className="icon" />
                }
            />

            <div className="product-detail">
                <img src={product?.image} alt={product?.name} />

                <div className="product-info">
                    <h2>Price: €{product?.price}</h2>
                    <ul className="product-nav">
                        <NavButton
                            to="/cart"
                            icon={<FontAwesomeIcon icon={faCartPlus} />}
                            onClick={handleAddToCart}
                            label={`Add to Cart - €${product?.price ?? 'N/A'}`}
                        />
                    </ul>
                    <p>{product?.description}</p>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
