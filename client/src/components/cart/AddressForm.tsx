import NavButton from '../navigation/NavButton';
import LogoHeading from '../navigation/LogoHeading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Customer, Address, AddressFormProps } from '../../Types/CartTypes';
import { useCustomer } from '../../hooks/cart/useCustomerContext';

const AddressForm: React.FC<AddressFormProps> = () => {
    const { customer, setCustomer } = useCustomer();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name in customer) {
            setCustomer({
                ...customer,
                [name]: value,
            });
        } else {
            setCustomer({
                ...customer,
                address: {
                    ...customer.address,
                    [name]: value,
                },
            });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCustomer(customer);
    };

    return (
        <form id="form" onSubmit={handleSubmit}>
            <LogoHeading headingText={'Enter Shipping/Billing Details Below'} />

            <div className="address-form-details">
                {(
                    Object.keys(customer) as unknown as Array<keyof Customer>
                ).map(field => {
                    if (field === 'address') {
                        return (
                            Object.keys(customer.address) as unknown as Array<
                                keyof Address
                            >
                        ).map(subField => (
                            <input
                                key={subField}
                                type="text"
                                name={subField}
                                value={customer.address[subField]}
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
                                value={customer[field]}
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
