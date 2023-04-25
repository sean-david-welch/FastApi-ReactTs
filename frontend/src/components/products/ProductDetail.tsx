import useProductDetail from '../../hooks/products/useProductDetail';
import NavButton from '../navigation/NavButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

const ProductDetail = () => {
    const { product, loading } = useProductDetail();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section id="product-detail">
            <h2 className="section-heading">
                Primal Formula's - {product?.name}:
            </h2>
            <div className="product-detail">
                <img src={product?.image} alt={product?.name} />

                <div className="product-info">
                    <h2>Price: €{product?.price}</h2>
                    <ul className="product-nav">
                        <NavButton
                            to="/cart"
                            icon={<FontAwesomeIcon icon={faCartPlus} />}
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
