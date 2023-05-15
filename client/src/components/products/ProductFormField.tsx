import { ProductFormFieldsProps } from '../../Types/ProductTypes';

const ProductFormField: React.FC<ProductFormFieldsProps> = ({
    name,
    value,
    handleChange,
}) => {
    return (
        <div className="input-fields">
            <label>{name.charAt(0).toUpperCase() + name.slice(1)}:</label>
            <input
                type="text"
                name={name}
                placeholder={name}
                value={value || ''}
                onChange={handleChange}
            />
        </div>
    );
};

export default ProductFormField;
