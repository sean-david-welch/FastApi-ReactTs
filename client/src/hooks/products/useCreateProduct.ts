import { useMutation } from '@tanstack/react-query';
import { Product } from '../../types/Types';
import { AxiosError } from 'axios';

import fetchAuthData from '../../utils/fetchAuthData';

const useCreateProduct = () => {
    const createProduct = useMutation<Product, AxiosError, Product>(
        async (product: Product) => {
            const response = await fetchAuthData({
                endpoint: '/products',
                method: 'POST',
                data: product,
            });
            return response;
        }
    );

    return createProduct;
};

export default useCreateProduct;
