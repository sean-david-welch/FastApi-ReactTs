import fetchData from '../../utils/fetchData';
import { useCart } from './useCartContext';
import { useCustomer } from './useCustomerContext';
import { useQuery } from '@tanstack/react-query';
import { Appearance } from '@stripe/stripe-js';

const usePaymentIntent = () => {
    const cartContext = useCart();
    const { customer } = useCustomer();

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

    const {
        data: clientSecret,
        isLoading: isFetchingClientSecret,
        error,
    } = useQuery(['paymentIntent'], fetchClientSecret);

    const appearance: Appearance = {
        theme: 'night',
        variables: {
            colorPrimary: '#b59410',
            colorBackground: '#2f2f2f',
        },
    };

    const options = clientSecret
        ? {
              clientSecret,
              appearance,
          }
        : {};

    return {
        options,
        clientSecret,
        isFetchingClientSecret,
        error,
    };
};

export default usePaymentIntent;
