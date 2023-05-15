import fetchData from '../../utils/fetchData';
import { useCart } from './useCartContext';
import { useQuery } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { useCustomer } from './useCustomerContext';
import { STRIPE_PUBLIC_KEY } from '../../utils/config';

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export const usePaymentIntent = () => {
    console.log('fetchPaymentIntent called');

    const cartContext = useCart();
    const { customer } = useCustomer();

    const fetchPaymentIntent = async () => {
        console.log('cart length:', cartContext.cart.length);
        console.log('customer email:', customer.email);
        if (
            cartContext.cart.length === 0 ||
            !customer.email ||
            customer.email.trim() === null ||
            undefined ||
            ''
        ) {
            console.log('fetchPaymentIntent early exit condition met');
            return null;
        }

        const items = cartContext.cart.map(item => ({
            price: item.price,
            quantity: item.quantity,
        }));

        const data = {
            cart: items,
            customer: {
                name: customer.name,
                address: { ...customer.address },
            },
            receipt_email: customer.email,
        };

        console.log('Data being sent to the backend:', data);

        const postData = await fetchData({
            endpoint: 'create-payment-intent',
            method: 'POST',
            data: JSON.stringify(data),
        });

        console.log('Response from create-payment-intent endpoint:', postData);

        return postData.client_secret;
    };

    const {
        data: clientSecret,
        isLoading,
        error,
    } = useQuery(['paymentIntent'], fetchPaymentIntent, {});

    const options = clientSecret
        ? {
              clientSecret,
          }
        : {};

    return {
        error,
        options,
        isLoading,
        clientSecret,
        stripePromise,
    };
};
