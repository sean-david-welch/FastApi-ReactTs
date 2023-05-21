import fetchData from '../../utils/fetchData';
import { useCart } from './useCartContext';
import { useCustomer } from './useCustomerContext';
import { useMutation } from '@tanstack/react-query';
import { Appearance } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

const usePaymentIntent = () => {
    const cartContext = useCart();
    const { customer } = useCustomer();
    const [hasFetchedClientSecret, setHasFetchedClientSecret] = useState(false);

    const fetchClientSecret = async () => {
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

        const postData = await fetchData({
            endpoint: 'create-payment-intent',
            method: 'POST',
            data: JSON.stringify(data),
        });

        return postData.client_secret;
    };

    const createPaymentIntentMutation = useMutation(fetchClientSecret, {
        onSuccess: () => {
            setHasFetchedClientSecret(true);
        },
    });

    useEffect(() => {
        if (
            !hasFetchedClientSecret &&
            cartContext.cart.length > 0 &&
            customer !== null &&
            !createPaymentIntentMutation.isLoading
        ) {
            createPaymentIntentMutation.mutate();
        }
    }, [hasFetchedClientSecret, cartContext.cart, customer]);

    const appearance: Appearance = {
        theme: 'night',
        variables: {
            colorPrimary: '#b59410',
            colorBackground: '#2f2f2f',
        },
    };

    const options = createPaymentIntentMutation.data
        ? {
              clientSecret: createPaymentIntentMutation.data,
              appearance,
          }
        : {};

    return {
        options,
        clientSecret: createPaymentIntentMutation.data,
        isFetchingClientSecret: createPaymentIntentMutation.isLoading,
        error: createPaymentIntentMutation.error,
    };
};

export default usePaymentIntent;
