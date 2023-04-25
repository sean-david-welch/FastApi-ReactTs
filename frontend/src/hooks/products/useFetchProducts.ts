import { useEffect, useState } from 'react';
import fetchData from '../../utils/fetchData';
import { Product } from '../../types/Types';

interface fetchProductOptions {
    endpoint: string;
}

const useFetchProducts = ({ endpoint }: fetchProductOptions) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const responseData = await fetchData({
                    endpoint,
                    method: 'GET',
                });
                setProducts(responseData);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [endpoint]);

    return { products, error, loading };
};

export default useFetchProducts;
