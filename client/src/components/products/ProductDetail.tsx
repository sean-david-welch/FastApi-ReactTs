import NavButton from '../navigation/NavButton';
import SectionHeading from '../navigation/SectionHeading';
import Loading from '../Loading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faCartPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProductDetailProps } from '../../types/ProductTypes';
import { useCheckoutSession } from '../../hooks/products/useCheckoutSession';

const ProductDetail: React.FC<ProductDetailProps> = ({
    product,
    loading,
    handleAddToCart,
    isLoggedIn,
    isSuperUser,
}) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const { mutateAsync, isLoading } = useCheckoutSession(
        product?.id,
        quantity
    );

    const handleUpdateClick = () => {
        navigate('/product-form', { state: { action: 'update', product } });
    };

    const handleBuyNowClick = async () => {
        try {
            await mutateAsync();
        } catch (error) {
            console.error(error);
        }
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
            {isLoggedIn && isSuperUser ? (
                <SectionHeading
                    onClick={handleUpdateClick}
                    headingText={`${product ? product.name : ''}`}
                    buttonLabel="Update Product"
                    buttonUrl="/product-form"
                    buttonIcon={
                        <FontAwesomeIcon icon={faArrowRight} className="icon" />
                    }
                />
            ) : (
                <h2 className="section-heading">
                    {`${product ? product.name : ''}`}
                </h2>
            )}

            <div className="product-detail">
                <img src={product?.image} alt={product?.name} />

                <div className="product-info">
                    <h2>Price: €{product?.price}</h2>
                    <p>{product?.description}</p>
                    <ul className="input-nav">
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={e =>
                                setQuantity(parseInt(e.target.value, 10))
                            }
                            disabled={isLoading}
                        />
                    </ul>
                    <ul className="product-nav">
                        <NavButton
                            to="/cart"
                            icon={<FontAwesomeIcon icon={faCartPlus} />}
                            onClick={handleAddToCart}
                            label={`Add to Cart - €${product?.price ?? 'N/A'}`}
                        />
                        <NavButton
                            onClick={handleBuyNowClick}
                            icon={<FontAwesomeIcon icon={faArrowRight} />}
                            label="Buy Now"
                        />
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
