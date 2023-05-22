import { useQuery } from '@tanstack/react-query';
import fetchData from '../../utils/fetchData';

export const useFetchIntent = (payment_intent_id: string) => {
    const query = useQuery(
        ['paymentIntent', payment_intent_id],
        async () => {
            const response = await fetchData({
                endpoint: `get-payment-intent/${payment_intent_id}`,
                method: 'GET',
            });
            return response;
        },
        {
            enabled: !!payment_intent_id,
            retry: false,
            staleTime: 1000 * 60 * 60,
        }
    );

    return query;
};
