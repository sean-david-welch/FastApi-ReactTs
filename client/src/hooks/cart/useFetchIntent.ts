import { STRIPE_PUBLIC_KEY } from '../../utils/config';
import { useCart } from './useCartContext';
import { useQuery } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { Address } from '../../types/Types';
import fetchData from '../../utils/fetchData';

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export const usePaymentIntent = (email: string, address: Address) => {
    const cartContext = useCart();

    const fetchPaymentIntent = async () => {
        if (cartContext.cart.length === 0) {
            return null;
        }

        const items = cartContext.cart.map(item => ({
            price: item.price,
            quantity: item.quantity,
        }));
        const dataToSend = {
            cart: items,
            shipping: {
                name: email,
                address: address,
            },
            receipt_email: email,
        };

        const data = await fetchData({
            endpoint: 'create-payment-intent',
            method: 'POST',
            data: JSON.stringify(dataToSend),
        });

        return data.client_secret;
    };

    const {
        data: clientSecret,
        isLoading,
        error,
    } = useQuery(['paymentIntent'], fetchPaymentIntent, {
        enabled: cartContext.cart.length > 0,
    });

    const options = clientSecret
        ? {
              clientSecret,
          }
        : {};

    return {
        clientSecret,
        stripePromise,
        options,
        isLoading,
        error,
    };
};
