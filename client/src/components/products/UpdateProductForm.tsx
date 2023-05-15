import { Product } from '../../Types/ProductTypes';
import { useState, useEffect } from 'react';
import { ProductUpdateFormProps } from '../../Types/ProductTypes';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import useUpdateProduct from '../../hooks/products/useUpdateProduct';

const ProductUpdateForm = ({ initialProduct }: ProductUpdateFormProps) => {
    const [product, setProduct] = useState<Product>(initialProduct);
    const updateProduct = useUpdateProduct();
    const navigate = useNavigate();

    useEffect(() => {
        setProduct(initialProduct);
    }, [initialProduct]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        updateProduct.mutate(
            { product_id: product.id, product },
            {
                onSuccess: () => {
                    setProduct(initialProduct);
                    navigate(`/product/${product.id}`);
                },
                onError: () => {},
            }
        );
    };

    return (
        <ProductForm
            product={product}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isLoading={updateProduct.isLoading}
            isSuccess={updateProduct.isSuccess}
            isError={updateProduct.isError}
            errorMessage={updateProduct.error?.message || ''}
            operation="Update"
        />
    );
};

export default ProductUpdateForm;
