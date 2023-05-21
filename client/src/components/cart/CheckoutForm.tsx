import { useCart } from '../../hooks/cart/useCartContext';
import { PaymentIntentData } from '../../Types/CartTypes';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { STRIPE_PUBLIC_KEY } from '../../utils/config';
import { useEffect, useState } from 'react';

import Loading from '../Loading';
import PaymentForm from './PaymentForm';
import usePaymentIntent from '../../hooks/cart/usePaymentIntent';

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const CheckoutForm: React.FC = () => {
    const { cart, calculateTotalAmount } = useCart();
    const totalAmount = calculateTotalAmount(cart as PaymentIntentData['cart']);
    const { options, clientSecret, error, isFetchingClientSecret } =
        usePaymentIntent();

    const [currentClientSecret, setCurrentClientSecret] =
        useState(clientSecret);

    useEffect(() => {
        if (clientSecret && !currentClientSecret) {
            setCurrentClientSecret(clientSecret);
        }
    }, [clientSecret]);

    if (isFetchingClientSecret) {
        return (
            <div className="stripe-form">
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className="stripe-form">Error: {(error as Error).message}</div>
        );
    }

    return (
        <div className="stripe-form">
            {currentClientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <PaymentForm
                        clientSecret={currentClientSecret}
                        totalAmount={totalAmount}
                    />
                </Elements>
            )}
        </div>
    );
};

export default CheckoutForm;
