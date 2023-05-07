import { useQuery } from '@tanstack/react-query';
import { Product, FetchProductOptions } from '../../types/Types';
import fetchData from '../../utils/fetchData';

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
        { retry: false }
    );

    return { products, error, loading };
};

export default useFetchProducts;
