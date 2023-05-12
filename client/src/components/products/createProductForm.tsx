import { Product } from '../../types/Types';
import { useState } from 'react';
import LogoHeading from '../navigation/LogoHeading';
import useCreateProduct from '../../hooks/products/useCreateProduct';

const CreateProductForm = () => {
    const [product, setProduct] = useState<Product>({
        name: '',
        description: '',
        price: 0,
        image: '',
    } as Product);
    const createProduct = useCreateProduct();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
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
        <form className="product-form" onSubmit={handleSubmit}>
            <LogoHeading headingText={`Create New Product:`} />

            {Object.keys(product).map(
                key =>
                    ['name', 'description', 'price', 'image'].includes(key) && (
                        <div className="input-fields" key={key}>
                            <label>
                                {key.charAt(0).toUpperCase() + key.slice(1)}:
                            </label>
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
                disabled={createProduct.isLoading}
            >
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

export default CreateProductForm;