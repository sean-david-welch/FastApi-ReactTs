import { Product } from '../../types/Types';
import { useState, useEffect } from 'react';
import LogoHeading from '../navigation/LogoHeading';
import useUpdateProduct from '../../hooks/products/useUpdateProduct';

interface ProductUpdateFormProps {
    initialProduct: Product;
}

const ProductUpdateForm = ({ initialProduct }: ProductUpdateFormProps) => {
    const [product, setProduct] = useState<Product>(initialProduct);
    const updateProduct = useUpdateProduct();

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
                },
                onError: () => {},
            }
        );
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <LogoHeading headingText={`Update ${product.name}`} />

            {Object.keys(product).map(
                key =>
                    ['name', 'description', 'price', 'image'].includes(key) && (
                        <div className="input-fields" key={key}>
                            <label>{key}</label>
                            <input
                                type="text"
                                name={key}
                                placeholder={key}
                                value={product[key as keyof Product] || ''}
                                onChange={handleChange}
                            />
                        </div>
                    )
            )}
            <button
                className="btn btn-nav btn-primary"
                type="submit"
                disabled={updateProduct.isLoading}
            >
                {updateProduct.isLoading ? 'Updating...' : 'Update Product'}
            </button>
            {updateProduct.isSuccess && <p>Product updated successfully!</p>}
            {updateProduct.isError && (
                <p>
                    Error:{' '}
                    {updateProduct.error.message || 'Something went wrong.'}
                </p>
            )}
        </form>
    );
};

export default ProductUpdateForm;
