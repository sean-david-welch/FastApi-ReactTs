import fetchData from '../../utils/fetchData';
import { useCart } from './useCartContext';
import { useQuery } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { useCustomer } from './useCustomerContext';
import { STRIPE_PUBLIC_KEY } from '../../utils/config';

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const usePaymentIntent = (shouldFetch: boolean) => {
    const cartContext = useCart();
    const { customer } = useCustomer();

    const fetchPaymentIntent = async () => {
        if (cartContext.cart.length === 0) {
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

    const { data: clientSecret } = useQuery(
        ['paymentIntent'],
        fetchPaymentIntent,
        {
            enabled: shouldFetch,
        }
    );

    const options = clientSecret
        ? {
              clientSecret,
          }
        : {};

    return {
        options,
        clientSecret,
        stripePromise,
    };
};

export default usePaymentIntent;
