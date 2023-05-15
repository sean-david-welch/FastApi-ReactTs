import { useState } from 'react';
import { AddressElement } from '@stripe/react-stripe-js';
import { Address } from '../../Types/CartTypes';
import LogoHeading from '../navigation/LogoHeading';

interface AddressFormProps {
    email: string;
    address: Address;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setAddress: React.Dispatch<React.SetStateAction<any>>;
    onSubmit: (data: { name: string; email: string; address: any }) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState<Address>({
        line1: '',
        line2: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
    });

    const handleAddressChange = (event: any) => {
        if (event.complete && !event.error) {
            setName(event.value.name);
            setAddress(event.value.address);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ name, email, address });
    };

    return (
        <form className="stripe" onSubmit={handleSubmit}>
            <LogoHeading headingText={'Primal Formulas Checkout'} />

            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
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
