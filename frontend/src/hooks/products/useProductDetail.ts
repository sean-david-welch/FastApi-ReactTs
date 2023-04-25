// hooks/useProductDetail.ts
import { useParams } from 'react-router-dom';
import useFetchProducts from './useFetchProducts';

function useProductDetail() {
    const { productId } = useParams<{ productId: string }>();
    console.log('productId:', productId);
    const { products, error, loading } = useFetchProducts({
        endpoint: `products/${productId}`,
    });

    const product = products ? products[0] : null;

    return { product, error, loading };
}

export default useProductDetail;
