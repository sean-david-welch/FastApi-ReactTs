import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom'; // Import this
import CheckoutForm from './CheckoutForm';
import { usePaymentIntent } from '../../hooks/cart/usePaymentIntent';

const CheckoutPage: React.FC = () => {
    const { clientSecret, stripePromise, options } = usePaymentIntent();
    const location = useLocation();
    const total = location.state ? location.state.total : 0;

    return (
        <>
            {clientSecret && (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm
                        key={clientSecret}
                        clientSecret={clientSecret}
                        totalAmount={total}
                    />
                </Elements>
            )}
        </>
    );
};

export default CheckoutPage;
