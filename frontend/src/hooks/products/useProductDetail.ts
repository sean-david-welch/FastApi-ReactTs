import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchData from '../../utils/fetchData';

function useProductDetail() {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProduct = async () => {
            console.log(`Fetching product with ID: ${productId}`);
            try {
                setLoading(true);
                const data = await fetchData({
                    endpoint: `products/${productId}`,
                    method: 'GET',
                });
                setProduct(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    return { product, error, loading };
}

export default useProductDetail;

// import { useParams } from 'react-router-dom';
// import useFetchProducts from './useFetchProducts';

// function useProductDetail() {
//     const { productId } = useParams<{ productId: string }>();

//     console.log('productId:', productId);
//     const { products, error, loading } = useFetchProducts({
//         endpoint: `products/${productId}`,
//     });

//     const product = products ? products[0] : null;

//     return { product, error, loading };
// }

// export default useProductDetail;
