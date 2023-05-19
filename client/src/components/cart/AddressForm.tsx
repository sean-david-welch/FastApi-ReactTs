import { useState, useEffect } from 'react';
import { Customer, Address } from '../../Types/CartTypes';
import { useCustomer } from '../../hooks/cart/useCustomerContext';
import LogoHeading from '../navigation/LogoHeading';

interface AddressFormProps {
    onSubmit: (data: Customer) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit }) => {
    const { customer, setCustomer } = useCustomer();

    const [formData, setFormData] = useState(customer);

    useEffect(() => {
        setFormData(customer);
    }, [customer]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name in formData) {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value,
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                address: {
                    ...prevFormData.address,
                    [name]: value,
                },
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCustomer(formData);
        onSubmit(formData);
    };
    return (
        <form id="form" onSubmit={handleSubmit}>
            <LogoHeading headingText={'Enter Shipping/Billing Details Below'} />

            <div className="address-form-details">
                {(
                    Object.keys(formData) as unknown as Array<keyof Customer>
                ).map(field => {
                    if (field === 'address') {
                        return (
                            Object.keys(formData.address) as unknown as Array<
                                keyof Address
                            >
                        ).map(subField => (
                            <input
                                key={subField}
                                type="text"
                                name={subField}
                                value={formData.address[subField]}
                                onChange={handleInputChange}
                                placeholder={subField}
                            />
                        ));
                    } else {
                        return (
                            <input
                                key={field}
                                type="text"
                                name={field}
                                value={formData[field]}
                                onChange={handleInputChange}
                                placeholder={field}
                            />
                        );
                    }
                })}
            </div>

            <button className="btn btn-nav btn-primary" type="submit">
                Proceed to Payment
            </button>
        </form>
    );
};

export default AddressForm;
