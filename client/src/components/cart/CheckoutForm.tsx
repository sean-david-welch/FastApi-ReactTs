// CheckoutForm.tsx
import { useState } from 'react';
import { useCart } from '../../hooks/cart/useCartContext';
import { PaymentIntentData } from '../../Types/CartTypes';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { STRIPE_PUBLIC_KEY } from '../../utils/config';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import usePaymentIntent from '../../hooks/cart/usePaymentIntent';

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const CheckoutForm: React.FC = () => {
    const { cart, calculateTotalAmount } = useCart();
    const totalAmount = calculateTotalAmount(cart as PaymentIntentData['cart']);
    const [isAddressFormSubmitted, setIsAddressFormSubmitted] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | undefined>();
    const { fetchClientSecret } = usePaymentIntent();

    const handleAddressFormSubmit = async () => {
        setIsAddressFormSubmitted(true);
        const secret = await fetchClientSecret();
        setClientSecret(secret);
    };

    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <div className="stripe-form">
                <AddressForm onSubmit={handleAddressFormSubmit} />
                {isAddressFormSubmitted && (
                    <PaymentForm
                        totalAmount={totalAmount}
                        clientSecret={clientSecret}
                    />
                )}
            </div>
        </Elements>
    );
};

export default CheckoutForm;
