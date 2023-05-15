import { useCart } from '../../hooks/cart/useCartContext';
import { CartItem } from '../../Types/CartTypes';
import { Elements } from '@stripe/react-stripe-js';
import { useEffect } from 'react';
import { usePaymentIntent } from '../../hooks/cart/useFetchIntent';
import Loading from '../Loading';
import CheckoutForm from './CheckoutForm';

const CheckoutPage: React.FC = () => {
    const cartContext = useCart();
    const { clientSecret, stripePromise, options, error, isLoading } =
        usePaymentIntent() as {
            clientSecret: string | null;
            stripePromise: any;
            options: any;
            error: { message: string } | null;
            isLoading: boolean;
        };

    const calculateTotalAmount = (cart: CartItem[]) => {
        return cart.reduce(
            (acc: number, item: CartItem) => acc + item.price * item.quantity,
            0
        );
    };

    const totalAmount = calculateTotalAmount(cartContext.cart);

    useEffect(() => {
        console.log('clientSecret:', clientSecret);
        console.log('stripePromise:', stripePromise);
        console.log('options:', options);
    }, [clientSecret, stripePromise, options]);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <p>An error occurred: {error.message}</p>;
    }

    if (!clientSecret) {
        return <p>No payment data available</p>;
    }

    return (
        <Elements options={options} stripe={stripePromise}>
            <CheckoutForm
                clientSecret={clientSecret}
                totalAmount={totalAmount}
            />
        </Elements>
    );
};

export default CheckoutPage;
