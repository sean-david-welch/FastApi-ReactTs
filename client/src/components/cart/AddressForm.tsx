import { AddressElement } from '@stripe/react-stripe-js';
import { useCustomer } from '../../hooks/cart/useCustomerContext';
import { Customer } from '../../Types/CartTypes';
import LogoHeading from '../navigation/LogoHeading';

interface AddressFormProps {
    onSubmit: (data: Customer) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit }) => {
    const { customer, setCustomer } = useCustomer();

    const handleAddressChange = (event: any) => {
        if (event.complete && !event.error) {
            setCustomer({
                ...customer,
                name: event.value.name,
                address: event.value.address,
            });
        }
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer({
            ...customer,
            email: event.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(customer);
    };

    return (
        <form className="stripe" onSubmit={handleSubmit}>
            <LogoHeading headingText={'Primal Formulas Checkout'} />

            <input
                type="email"
                value={customer.email}
                onChange={handleEmailChange}
                placeholder="Email address"
            />
            <AddressElement
                id="address-element"
                options={{ mode: 'shipping' }}
                onChange={handleAddressChange}
            />
            <button type="submit">Proceed to Payment</button>
        </form>
    );
};

export default AddressForm;
