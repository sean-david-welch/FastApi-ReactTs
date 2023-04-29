import fetchData from '../../utils/fetchData';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCartContext } from './useCartContext';
import { STRIPE_PUBLIC_KEY } from '../../utils/config';

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export const usePaymentIntent = () => {
    const [clientSecret, setClientSecret] = useState<string | null>('');
    const cartContext = useCartContext();

    useEffect(() => {
        const fetchPaymentIntent = async () => {
            if (cartContext.cart.length === 0) {
                return;
            }

            const items = cartContext.cart.map(item => ({
                price: item.price,
                quantity: item.quantity,
            }));

            try {
                const data = await fetchData({
                    endpoint: 'create-payment-intent',
                    method: 'POST',
                    data: JSON.stringify(items),
                });

                setClientSecret(data.client_secret);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPaymentIntent();
    }, [cartContext.cart]);

    useEffect(() => {
        if (!clientSecret) {
            return;
        }
    }, [clientSecret]);

    const options = clientSecret
        ? {
              clientSecret,
          }
        : {};

    return {
        clientSecret,
        stripePromise,
        options,
    };
};
