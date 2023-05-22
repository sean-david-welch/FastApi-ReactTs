import { useMutation } from '@tanstack/react-query';
import fetchData from '../../utils/fetchData';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLIC_KEY } from '../../utils/config';

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export const useCheckoutSession = (product_id: string) => {
    return useMutation(
        data =>
            fetchData({
                endpoint: `create-checkout-session/${product_id}`,
                method: 'POST',
                data: data,
            }),
        {
            onSuccess: async data => {
                const stripe = await stripePromise;
                if (!stripe) {
                    console.log('Stripe failed to initialize.');
                    return;
                }
                const { error } = await stripe.redirectToCheckout({
                    sessionId: data.id,
                });
                if (error) {
                    console.log(error);
                }
            },
            onError: error => {
                console.log(error);
            },
        }
    );
};
