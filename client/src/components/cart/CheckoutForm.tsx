import { useState } from 'react';
import { CheckoutFormProps } from '../../types/Types';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import AddressForm from './AddressForm';
import usePaymentProcessor from '../../hooks/cart/usePaymentProcessor';

const CheckoutForm: React.FC<CheckoutFormProps> = ({
    email,
    address,
    totalAmount,
    clientSecret,
    setEmail,
    setAddress,
}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [addressFormSubmitted, setAddressFormSubmitted] = useState(false);

    const { message, isLoading, handlePayment } = usePaymentProcessor({
        stripe,
        elements,
        clientSecret,
        email,
        address,
        setEmail,
        setAddress,
    });

    const handleSubmit = (data: {
        name: string;
        email: string;
        address: any;
    }) => {
        setEmail(data.email);
        setAddress(data.address);
        setAddressFormSubmitted(true);
    };

    return (
        <div className="stripe-form">
            {!addressFormSubmitted ? (
                <AddressForm
                    email={email}
                    address={address}
                    setEmail={setEmail}
                    setAddress={setAddress}
                    onSubmit={handleSubmit}
                />
            ) : (
                <PaymentForm
                    handleSubmit={handlePayment}
                    isLoading={isLoading}
                    stripe={stripe}
                    elements={elements}
                    totalAmount={totalAmount}
                />
            )}
            {message && <div id="payment-message">{message}</div>}
        </div>
    );
};

export default CheckoutForm;
