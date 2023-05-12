import { useState } from 'react';
import { Product } from '../../types/Types';
import useCreateProduct from '../../hooks/products/useCreateProduct';

const ProductForm = () => {
    const [product, setProduct] = useState<Product>({} as Product);
    const createProduct = useCreateProduct();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        createProduct.mutate(product, {
            onSuccess: () => {
                setProduct({} as Product);
            },
            onError: () => {},
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={product.name || ''}
                onChange={handleChange}
                required
            />
            <button type="submit" disabled={createProduct.isLoading}>
                {createProduct.isLoading ? 'Creating...' : 'Create Product'}
            </button>
            {createProduct.isSuccess && <p>Product created successfully!</p>}
            {createProduct.isError && (
                <p>
                    Error:{' '}
                    {createProduct.error.message || 'Something went wrong.'}
                </p>
            )}
        </form>
    );
};

export default ProductForm;
