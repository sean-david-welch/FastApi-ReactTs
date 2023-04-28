import { useEffect, useState } from 'react';
import { Product, FetchProductOptions } from '../../types/Types';
import fetchData from '../../utils/fetchData';

const useFetchProducts = (options: FetchProductOptions) => {
    const { endpoint, isSingleProduct = false } = options;

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
                if (isSingleProduct) {
                    setProducts([responseData]);
                } else {
                    setProducts(responseData);
                }
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [endpoint, isSingleProduct]);

    return { products, error, loading };
};

export default useFetchProducts;
