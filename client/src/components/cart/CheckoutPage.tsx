import React, { useState } from 'react';
import { useCart } from '../../hooks/cart/useCartContext';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { usePaymentIntent } from '../../hooks/cart/useFetchIntent';
import { CartItem } from '../../Types/CartTypes';

const CheckoutPage: React.FC = () => {
    const cartContext = useCart();

    const [addressFormSubmitted, setAddressFormSubmitted] = useState(false);

    const { clientSecret, stripePromise, options } = usePaymentIntent({
        email,
        name,
        address,
    });

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
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm
                        clientSecret={clientSecret}
                        totalAmount={totalAmount}
                        email={email}
                        setEmail={setEmail}
                        address={address}
                        setAddress={setAddress}
                        addressFormSubmitted={addressFormSubmitted}
                        setAddressFormSubmitted={setAddressFormSubmitted}
                    />
                </Elements>
            )}
        </>
    );
};

export default CheckoutPage;
