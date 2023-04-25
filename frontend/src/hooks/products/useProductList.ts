import useFetchProducts from './useFetchProducts';

const useProductList = () => {
    const { products, error, loading } = useFetchProducts({
        endpoint: 'products',
    });
    return { products, error, loading };
};

export default useProductList;
