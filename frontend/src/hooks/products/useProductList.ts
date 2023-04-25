import { useEffect, useState } from 'react';
import fetchData from '../../utils/fetchData';

import { Product } from '../../types/Types';

const useProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await fetchData({
                    endpoint: 'products',
                    method: 'GET',
                });
                setProducts(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);
    return { products, error, loading };
};

export default useProductList;

// import useFetchProducts from './useFetchProducts';

// const useProductList = () => {
//     const { products, error, loading } = useFetchProducts({
//         endpoint: 'products',
//     });
//     return { products, error, loading };
// };

// export default useProductList;
