import { STRIPE_PUBLIC_KEY } from '../../utils/config';
import { useCart } from './useCartContext';
import { useCustomer } from './useCustomerContext';
import { useQuery } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import fetchData from '../../utils/fetchData';

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export const usePaymentIntent = () => {
    const cartContext = useCart();
    const { customer } = useCustomer();

    const fetchPaymentIntent = async () => {
        if (cartContext.cart.length === 0 || !customer.email) {
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
