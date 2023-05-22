import { Product, ProductFormProps } from '../../types/ProductTypes';
import LogoHeading from '../navigation/LogoHeading';
import ProductFormField from './ProductFormField';

const ProductForm: React.FC<ProductFormProps> = ({
    product,
    handleChange,
    handleSubmit,
    isLoading,
    isSuccess,
    isError,
    errorMessage,
    operation,
}) => {
    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <LogoHeading
                headingText={`${operation} Product: ${product.name}`}
            />
            <div className="product-input-fields">
                {Object.keys(product).map(
                    key =>
                        ['name', 'description', 'price', 'image'].includes(
                            key
                        ) && (
                            <ProductFormField
                                key={key}
                                name={key}
                                value={product[key as keyof Product]}
                                handleChange={handleChange}
                            />
                        )
                )}
            </div>
            <button
                className="btn btn-nav btn-primary"
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? `${operation}...` : `${operation} Product`}
            </button>

            {isSuccess && <p>Product {operation} success</p>}
            {isError && <p>Error: {errorMessage || 'Something went wrong.'}</p>}
        </form>
    );
};

export default ProductForm;
