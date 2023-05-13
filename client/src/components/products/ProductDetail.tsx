import NavButton from '../navigation/NavButton';
import SectionHeading from '../navigation/SectionHeading';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';
import { faCartPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProductDetailProps } from '../../types/Types';

const ProductDetail: React.FC<ProductDetailProps> = ({
    product,
    loading,
    handleAddToCart,
    isLoggedIn,
    isSuperUser,
}) => {
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
                    <ul className="product-nav">
                        <NavButton
                            to="/cart"
                            icon={<FontAwesomeIcon icon={faCartPlus} />}
                            onClick={handleAddToCart}
                            label={`Add to Cart - €${product?.price ?? 'N/A'}`}
                        />
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
