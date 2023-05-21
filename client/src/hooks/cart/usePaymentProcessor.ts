import { FRONTEND_BASE_URL } from '../../utils/config';
import { useCustomer } from './useCustomerContext';
import { PaymentIntent } from '@stripe/stripe-js';
import { UsePaymentProps } from '../../Types/CartTypes';
import { useState, useEffect } from 'react';

const usePaymentProcessor = ({
    stripe,
    elements,
    clientSecret,
}: UsePaymentProps) => {
    const [message, setMessage] = useState<string | null>(null);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const { customer } = useCustomer();

    useEffect(() => {
        if (!stripe || !clientSecret) return;

        const retrievePaymentIntentStatus = async () => {
            setPaymentLoading(true);

            try {
                const result = await stripe.retrievePaymentIntent(clientSecret);
                const paymentIntent = result.paymentIntent as PaymentIntent;

                switch (paymentIntent.status) {
                    case 'succeeded':
                        setMessage('Payment succeeded!');
                        break;
                    case 'processing':
                        setMessage('Your payment is processing.');
                        break;
                    case 'requires_payment_method':
                        setMessage(
                            'Your payment was not successful, please try again.'
                        );
                        break;
                    default:
                        setMessage('Something went wrong.');
                        break;
                }
            } catch (error) {
                console.error('Error retrieving payment intent:', error);
                setMessage('Something went wrong.');
            } finally {
                setPaymentLoading(false);
                return message;
            }
        };

        retrievePaymentIntentStatus();
    }, [stripe, clientSecret]);

    const handlePayment = async (event?: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            return;
        }

        setPaymentLoading(true);

        try {
            const response = await stripe.confirmPayment({
                confirmParams: {
                    return_url: `${FRONTEND_BASE_URL}payment-success/`,
                    receipt_email: customer.email,
                },
                elements,
            });

            if (response.error) {
                setMessage(response.error.message || 'Something went wrong.');
                console.error('Payment error:', response.error);
            } else {
                setMessage('Payment successfully processed. Redirecting...');
                console.log('Payment succeeded:', response);
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            setMessage('Something went wrong.');
        } finally {
            setPaymentLoading(false);
            console.log('Payment complete.');
        }
    };

    return {
        paymentLoading,
        handlePayment,
    };
};

export default usePaymentProcessor;
