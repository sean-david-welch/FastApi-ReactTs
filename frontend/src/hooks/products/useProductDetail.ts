import { useParams } from 'react-router-dom';
import useFetchProducts from './useFetchProducts';

function useProductDetail() {
    const { productId } = useParams<{ productId: string }>();

    const { products, error, loading } = useFetchProducts({
        endpoint: `products/${productId}`,
        isSingleProduct: true,
    });

    const product = products ? products[0] : null;

    return { product, error, loading };
}

export default useProductDetail;
