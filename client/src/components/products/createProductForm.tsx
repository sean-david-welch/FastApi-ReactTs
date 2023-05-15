import { Product } from '../../Types/ProductTypes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import useCreateProduct from '../../hooks/products/useCreateProduct';

const CreateProductForm = () => {
    const [product, setProduct] = useState<Product>({
        name: '',
        description: '',
        price: 0,
        image: '',
    } as Product);
    const createProduct = useCreateProduct();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        createProduct.mutate(product, {
            onSuccess: () => {
                setProduct({} as Product);
                navigate(`/shop`);
            },
            onError: () => {},
        });
    };

    return (
        <ProductForm
            product={product}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isLoading={createProduct.isLoading}
            isSuccess={createProduct.isSuccess}
            isError={createProduct.isError}
            errorMessage={createProduct.error?.message || ''}
            operation="Create"
        />
    );
};

export default CreateProductForm;
