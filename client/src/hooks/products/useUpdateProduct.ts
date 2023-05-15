import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ProductUpdate } from '../../Types/ProductTypes';
import { Product } from '../../Types/ProductTypes';
import fetchAuthData from '../../utils/fetchAuthData';

const useUpdateProduct = () => {
    const updateProduct = useMutation<
        Product,
        AxiosError,
        { product_id: string; product: ProductUpdate }
    >(async ({ product_id, product }) => {
        const response = await fetchAuthData({
            endpoint: `/products/${product_id}`,
            method: 'PUT',
            data: product,
        });
        return response;
    });

    return updateProduct;
};

export default useUpdateProduct;
