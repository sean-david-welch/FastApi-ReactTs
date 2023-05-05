import useProductList from '../../hooks/products/useProductList';
import ProductItem from './ProductItem';
import LoadingSpinner from '../Loading';

function ProductsList() {
    const { products, loading } = useProductList();

    if (loading) {
        return (
            <section id="products">
                <LoadingSpinner />
            </section>
        );
    }

    return (
        <section id="products">
            <h2 className="section-heading">
                Browse Primal Formula's Products:
            </h2>
            <div className="products">
                <ul>
                    {products.map(product => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default ProductsList;
