import { Customer, Address } from '../../Types/CartTypes';
import { useCustomer } from '../../hooks/cart/useCustomerContext';
import LogoHeading from '../navigation/LogoHeading';

interface AddressFormProps {
    onSubmit: (data: Customer) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit }) => {
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
        onSubmit(customer);
    };

    return (
        <form className="stripe" onSubmit={handleSubmit}>
            <LogoHeading headingText={'Primal Formulas Checkout'} />

            <input
                type="text"
                name="name"
                value={customer.name}
                onChange={handleInputChange}
                placeholder="Full Name"
            />

            <input
                type="email"
                name="email"
                value={customer.email}
                onChange={handleInputChange}
                placeholder="Email Address"
            />

            {(
                Object.keys(customer.address) as unknown as Array<keyof Address>
            ).map(field => (
                <input
                    key={field}
                    type="text"
                    name={field}
                    value={customer.address[field]}
                    onChange={handleInputChange}
                    placeholder={field}
                />
            ))}

            <button type="submit">Proceed to Payment</button>
        </form>
    );
};

export default AddressForm;
