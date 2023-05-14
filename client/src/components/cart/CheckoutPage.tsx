import CheckoutForm from './CheckoutForm';
import { useState } from 'react';
import { useCart } from '../../hooks/cart/useCartContext';
import { CartItem } from '../../types/Types';
import { Elements } from '@stripe/react-stripe-js';
import { usePaymentIntent } from '../../hooks/cart/useFetchIntent';

const CheckoutPage: React.FC = () => {
    const cartContext = useCart();
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState({
        line1: '',
        line2: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
    });

    const { clientSecret, stripePromise, options } = usePaymentIntent(
        email,
        address
    );

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
                        email={email}
                        setEmail={setEmail}
                        address={address}
                        setAddress={setAddress}
                    />
                </Elements>
            )}
        </>
    );
};

export default CheckoutPage;
