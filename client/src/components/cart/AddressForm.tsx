import NavButton from '../navigation/NavButton';
import LogoHeading from '../navigation/LogoHeading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { Customer, Address, AddressFormProps } from '../../Types/CartTypes';
import { useCustomer } from '../../hooks/cart/useCustomerContext';

const AddressForm: React.FC<AddressFormProps> = () => {
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
        console.log(formData);
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

            <ul className="product-nav">
                <NavButton
                    to={{
                        pathname: '/checkout/payment-details',
                    }}
                    icon={<FontAwesomeIcon icon={faArrowRight} />}
                    label="Payment Details"
                />
            </ul>
        </form>
    );
};

export default AddressForm;
