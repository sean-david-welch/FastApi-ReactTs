import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { loadStripe } from '@stripe/stripe-js';
import fetchData from '../../utils/fetchData';
import { useCartContext } from './useCartContext';

const stripePromise = loadStripe(
    'pk_test_51MXR40LQKZpRvvuEz5IWRCdRssn1c3pOCIwXRYqky1GhyiiCyiuwBjAXJ4IHTMGblLCyuaXlv3SCPtwtDM1iv8OV00EoL8GlJq'
);

export const usePaymentIntent = () => {
    const [clientSecret, setClientSecret] = useState<string | null>('');
    const cartContext = useCartContext();

    const fetchPaymentIntent = useCallback(
        debounce(async () => {
            if (cartContext.cart.length === 0) {
                return;
            }

            const totalAmount = cartContext.cart.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            try {
                const data = await fetchData({
                    endpoint: 'create-payment-intent',
                    method: 'POST',
                    data: JSON.stringify({
                        cart: cartContext.cart,
                        total: totalAmount,
                    }),
                });

                setClientSecret(data.client_secret);
            } catch (error) {
                console.log(error);
            }
        }, 10),
        [cartContext.cart]
    );

    useEffect(() => {
        fetchPaymentIntent();
    }, [cartContext.cart, fetchPaymentIntent]);

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
        updateClientSecret: setClientSecret,
    };
};
