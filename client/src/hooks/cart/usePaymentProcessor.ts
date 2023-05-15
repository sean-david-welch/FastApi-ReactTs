import { useCustomer } from './useCustomerContext';
import { PaymentIntent } from '@stripe/stripe-js';
import { UsePaymentProps } from '../../Types/CartTypes';
import { useState, useEffect } from 'react';

const usePaymentProcessor = ({
    stripe,
    elements,
    clientSecret,
}: UsePaymentProps) => {
    const [message, setMessage] = useState<string | null>('');
    const [isLoading, setIsLoading] = useState(false);
    const { customer } = useCustomer();

    useEffect(() => {
        const retrievePaymentIntentStatus = async () => {
            if (!stripe || !clientSecret) return;

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
            }
        };

        retrievePaymentIntentStatus();
    }, [stripe, clientSecret]);

    const handlePayment = async () => {
        if (!stripe || !elements || !clientSecret || !customer?.email) {
            console.log(
                'Stripe, elements, clientSecret, or email is undefined'
            );
            return;
        }

        setIsLoading(true);

        try {
            const { error } = await stripe.confirmPayment({
                confirmParams: {
                    return_url: 'http://localhost:3000/payment-success',
                    receipt_email: customer.email,
                },
                elements,
            });
            if (error) {
                setMessage(error.message || 'Something went wrong.');
            } else {
                setMessage('Payment successfully processed. Redirecting...');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            setMessage('Something went wrong.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        stripe,
        elements,
        clientSecret,
        email: customer.email,
        message,
        isLoading,
        handlePayment,
    };
};

export default usePaymentProcessor;
