import ProductItem from './ProductItem';
import LoadingSpinner from '../Loading';
import useProductList from '../../hooks/products/useProductList';

function ProductsList() {
    const { products, loading } = useProductList();

    if (loading || !products) {
        return (
            <section id="products">
                <LoadingSpinner />
            </section>
        );
    }

    return (
        <section id="products">
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
