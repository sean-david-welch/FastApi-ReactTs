import { CheckoutFormProps } from '../../types/Types';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
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
    const { message, isLoading, handleSubmit } = usePaymentProcessor({
        stripe,
        elements,
        clientSecret,
        email,
        address,
        setEmail,
        setAddress,
    });

    return (
        <div className="stripe-form">
            <PaymentForm
                handleSubmit={handleSubmit}
                email={email}
                setEmail={setEmail}
                isLoading={isLoading}
                stripe={stripe}
                elements={elements}
                address={address}
                onAddressChange={setAddress}
                totalAmount={totalAmount}
            />
            {message && <div id="payment-message">{message}</div>}
        </div>
    );
};

export default CheckoutForm;
