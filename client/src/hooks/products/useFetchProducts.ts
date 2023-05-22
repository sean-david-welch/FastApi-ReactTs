import { useQuery } from '@tanstack/react-query';
import { Product } from '../../types/ProductTypes';
import fetchData from '../../utils/fetchData';
import { FetchProductOptions } from '../../types/FetchTypes';

const useFetchProducts = (options: FetchProductOptions) => {
    const { endpoint, isSingleProduct = false } = options;

    const fetchProducts = async () => {
        const responseData = await fetchData({
            endpoint,
            method: 'GET',
        });
        return isSingleProduct ? [responseData] : responseData;
    };

    const {
        data: products,
        error,
        isLoading: loading,
    } = useQuery<Product[], Error>(
        ['products', endpoint, isSingleProduct],
        fetchProducts,
        {
            retry: false,
            staleTime: 1000 * 60 * 10 * 24,
        }
    );

    return { products, error, loading };
};

export default useFetchProducts;
