import { STRIPE_PUBLIC_KEY } from '../../utils/config';
import { useCart } from './useCartContext';
import { useQuery } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { Address } from '../../Types/CartTypes';
import fetchData from '../../utils/fetchData';

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export const usePaymentIntent = ({
    email,
    name,
    address,
}: {
    email: string;
    name: string;
    address: Address;
}) => {
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
            customer: {
                name: name,
                address: { ...address },
            },
            receipt_email: email,
        };

        console.log('Data being sent to the backend:', dataToSend);

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
