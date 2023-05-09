import React from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { useCart } from '../../hooks/cart/useCartContext';
import { usePaymentIntent } from '../../hooks/cart/useFetchIntent';
import { CartItem } from '../../types/Types';
const CheckoutPage: React.FC = () => {
    const cartContext = useCart();
    const { clientSecret, stripePromise, options } = usePaymentIntent();

    const calculateTotalAmount = (cart: CartItem[]) => {
        return cart.reduce(
            (acc: number, item: CartItem) => acc + item.price * item.quantity,
            0
        );
    };

    const totalAmount = calculateTotalAmount(cartContext.cart);

    return (
        <>
            {clientSecret && (
                <Elements
                    options={options}
                    stripe={stripePromise}
                    key={clientSecret}
                >
                    <CheckoutForm
                        clientSecret={clientSecret}
                        totalAmount={totalAmount}
                    />
                </Elements>
            )}
        </>
    );
};

export default CheckoutPage;
